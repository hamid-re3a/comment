<?php

namespace Tests\Unit;

use App\Exceptions\ThreeLayerCommentException;
use App\Models\Comment;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * @test
     */
    public function can_not_add_more_than_three_layer_comment()
    {
        $first_comment = Comment::query()->create([
            'name'=>'hamid',
            'message'=>'First Comment'
        ]);
        $second_comment = Comment::query()->create([
            'name'=>'hamid',
            'message'=>'First Comment',
            'parent_id'=>$first_comment->id
        ]);
        $third_comment = Comment::query()->create([
            'name'=>'hamid',
            'message'=>'First Comment',
            'parent_id'=>$second_comment->id
        ]);

        $this->expectException(ThreeLayerCommentException::class);
        Comment::query()->create([
            'name'=>'hamid',
            'message'=>'First Comment',
            'parent_id'=>$third_comment->id
        ]);

    }
}
