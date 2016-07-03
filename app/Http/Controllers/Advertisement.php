<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Advertisement as Entity;

class Advertisement extends BaseController
{
    public function __construct(Entity $entity)
    {
        $this->entity = $entity;
    }

    public function serve($id)
    {
        $entity = $this->entity->query()->findOrFail($id);

        $entity->views = $entity->views + 1;
        $entity->save();

        $data = [
            'name' => $entity->name,
            'url' => $entity->url,
            'image' => $entity->image
        ];

        return response()->json($data);
    }
}
