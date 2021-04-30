<?php

namespace App\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\ArgDirective;
use Nuwave\Lighthouse\Support\Contracts\ArgTransformerDirective;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Vinkla\Hashids\Facades\Hashids;

class HashidDirective
extends BaseDirective
implements ArgDirective, ArgTransformerDirective, FieldMiddleware
{
    /**
     * Formal directive specification in schema definition language (SDL).
     */
    public static function definition(): string
    {
        return
            /** @lang GraphQL */
            <<<'GRAPHQL'
"""
When used upon a field, it encodes;
when used upon an argument, it decodes.
"""
directive @hashid on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION
GRAPHQL;
    }

    /**
     * Apply transformations on the value of an argument given to a field.
     *
     * @param string $argumentValue
     */
    public function transform($argumentValue): int
    {
        return Hashids::decode($argumentValue)[0];
    }

    /**
     * Wrap around the final field resolver.
     *
     * @param \Closure(FieldValue $field): FieldValue $next
     */
    public function handleField(
        FieldValue $fieldValue,
        Closure $next,
    ): FieldValue {
        // Retrieve the existing resolver function
        /** @var Closure $previousResolver */
        $previousResolver = $fieldValue->getResolver();

        // Wrap around the resolver
        $wrappedResolver = function (
            $root,
            array $args,
            GraphQLContext $context,
            ResolveInfo $info,
        ) use ($previousResolver): string {
            // Call the resolver, passing along the resolver arguments
            /** @var int $result */
            $result = $previousResolver($root, $args, $context, $info);

            return Hashids::encode($result);
        };

        // Place the wrapped resolver back upon the FieldValue
        // It is not resolved right now - we just prepare it
        $fieldValue->setResolver($wrappedResolver);

        // Keep the middleware chain going
        return $next($fieldValue);
    }
}
