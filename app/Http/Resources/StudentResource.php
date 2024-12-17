<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'first_name' => $this->Firstname,
            'last_name' => $this->Lastname,
            'dob' => $this->Birthdate,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
