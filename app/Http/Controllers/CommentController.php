<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Repositories\CommentRepository;
use Illuminate\Support\Facades\Log;
use Prettus\Validator\Exceptions\ValidatorException;

class CommentController extends Controller
{
    /**
     * @var CommentRepository
     */
    private $repository;

    public function __construct(CommentRepository $repository)
    {

        $this->repository = $repository;
    }

    public function store(CreateCommentRequest $request)
    {
        try {
            $comment = $this->repository->create($request->all());
            return api()->success('success',$comment);
        } catch (ValidatorException $e) {
            Log::error(__CLASS__ . '@' . __METHOD__ . 'error => ' . $e->getMessage());
        }

        return api()->error();
    }

}
