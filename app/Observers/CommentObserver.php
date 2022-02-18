<?php

namespace App\Observers;

use App\Exceptions\ThreeLayerCommentException;
use App\Models\Comment;

class CommentObserver
{

    public function creating(Comment $comment)
    {
        if ($comment->parent_id) {
            $parent_comment = Comment::query()->find($comment->parent_id);
            if ($parent_comment->_dpt >= 2)
                throw new ThreeLayerCommentException('Only 3 layer is supported');
        }
    }

    public function created(Comment $comment)
    {
        Comment::withoutEvents(function () {
            Comment::fixTree();
        });
        Comment::withoutEvents(function () use ($comment) {
            /** @var $comment Comment */
            $comment = Comment::withDepth()->find($comment->id);
            $comment->_dpt = $comment->depth;
            $comment->saveQuietly();
        });
    }


}
