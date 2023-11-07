<?php

namespace App\Http\Resources;

use App\Models\Desklist;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'lists' => DesklistResource::collection($this->lists)
        ];
    }
}
