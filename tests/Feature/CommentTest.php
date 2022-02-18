<?php

namespace Tests\Feature;

use App\Models\Comment;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * @test
     */
    public function create_new_comment_green()
    {
        $res = $this->post(route('api.comment.store'), [
            'name' => 'hamid',
            'message' => 'Hello this is my comment'
        ])->assertOk();


        $this->assertDatabaseHas('comments', [
            'name' => 'hamid'
        ]);

    }

    /**
     * @test
     */
    public function create_new_comment_failed()
    {
        $res = $this->post(route('api.comment.store'), [
            'message' => 'Hello this is my comment'
        ])->assertStatus(422);
    }


    /**
     * @test
     */
    public function create_new_comment_and_sub_comment_green()
    {
        $res = $this->post(route('api.comment.store'), [
            'name' => 'hamid',
            'message' => 'Hello this is my comment'
        ])->assertOk();
        $comment = $res->json()['data'];

        $res = $this->post(route('api.comment.store'), [
            'name' => 'Negar',
            'message' => 'Second Comment',
            'parent_id' => $comment['id']
        ])->assertOk();

        $second_comment_id = $res['data']['id'];
        $second_comment = Comment::query()->find($second_comment_id);
        $this->assertEquals(1, $second_comment->_dpt);
    }


    /**
     * @test
     */
    public function can_not_create_comment_more_than_three_layer()
    {
        $first_res = $this->post(route('api.comment.store'), [
            'name' => 'hamid',
            'message' => 'Hello this is my comment'
        ])->assertOk();

        $second_res = $this->post(route('api.comment.store'), [
            'name' => 'Negar',
            'message' => 'Second Comment',
            'parent_id' => $first_res->json()['data']['id']
        ])->assertOk();

        $second_comment = Comment::query()->find($second_res['data']['id']);
        $this->assertEquals(1, $second_comment->_dpt);


        $third_res = $this->post(route('api.comment.store'), [
            'name' => 'Negin',
            'message' => 'Third Comment',
            'parent_id' => $second_res->json()['data']['id']
        ])->assertOk();

        $third_comment = Comment::query()->find($third_res->json()['data']['id']);
        $this->assertEquals(2, $third_comment->_dpt);


        $fourth_res = $this->post(route('api.comment.store'), [
            'name' => 'Jasem',
            'message' => 'Third Comment',
            'parent_id' => $third_comment->id
        ])->assertStatus(400);


    }

    /**
     * @test
     */
    public function show_all_comments()
    {
        $first_res = $this->post(route('api.comment.store'), [
            'name' => 'hamid',
            'message' => 'Hello this is my comment'
        ])->assertOk();

        $second_res = $this->post(route('api.comment.store'), [
            'name' => 'Negar',
            'message' => 'Second Comment',
            'parent_id' => $first_res->json()['data']['id']
        ])->assertOk();

        $third_res = $this->post(route('api.comment.store'), [
            'name' => 'Negin',
            'message' => 'Third Comment',
            'parent_id' => $second_res->json()['data']['id']
        ])->assertOk();

        $res = $this->get(route('api.comment.index'))->assertOk();
    }

}
