<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;
use Vinkla\Hashids\Facades\Hashids;

class Task extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'creator_id',
        'title',
        'description',
    ];

    public function toSearchableArray(): array
    {
        $data = $this->only('id', 'title');
        $data['hashid'] = Hashids::encode($this->id);
        return $data;
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id')->withTrashed();
    }

    public function assignees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_assignee', relatedPivotKey: 'assignee_id');
    }
}
