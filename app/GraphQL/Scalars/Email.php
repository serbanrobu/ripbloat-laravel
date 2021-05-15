<?php

namespace App\GraphQL\Scalars;

use Domain\Email as DomainEmail;
use GraphQL\Error\Error;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;
use GraphQL\Utils\Utils;

/**
 * Read more about scalars here https://webonyx.github.io/graphql-php/type-definitions/scalars
 */
class Email extends ScalarType
{
    /**
     * Serializes an internal value to include in a response.
     *
     * @param  mixed  $value
     * @return mixed
     */
    public function serialize($value)
    {
        // Assuming the internal representation of the value is always correct
        return $value;

        // TODO validate if it might be incorrect
    }

    /**
     * Parses an externally provided value (query variable) to use as an input
     *
     * @param mixed $value
     * @return mixed
     */
    public function parseValue($value)
    {
        return DomainEmail::parse($value)
            ?? throw new Error(
                'Cannot represent following value as email: ' . Utils::printSafeJson($value),
            );
    }

    /**
     * Parses an externally provided literal value (hardcoded in GraphQL query) to use as an input.
     *
     * @param \GraphQL\Language\AST\Node $valueNode
     * @param array<string, mixed>|null $variables
     * @return mixed
     */
    public function parseLiteral($valueNode, ?array $variables = null)
    {
        if (!$valueNode instanceof StringValueNode) {
            throw new Error(
                'Query error: Can only parse strings got: ' . $valueNode->kind,
                [$valueNode],
            );
        }

        return DomainEmail::parse($valueNode->value)
            ?? throw new Error('Not a valid email', [$valueNode]);;
    }
}
