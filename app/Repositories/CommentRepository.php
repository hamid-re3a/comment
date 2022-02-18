<?php


namespace App\Repositories;


use App\Models\Comment;
use Prettus\Repository\Eloquent\BaseRepository;

class CommentRepository extends BaseRepository
{

    /**
     * @inheritDoc
     */
    public function model()
    {
        return Comment::class;
    }
}
