<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * @test
     */
    public function create_new_comment()
    {
        $res = $this->post(route('api.comment.store'),[])->assertOk();

    }
}
