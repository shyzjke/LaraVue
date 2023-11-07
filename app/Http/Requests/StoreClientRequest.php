<?php
 
namespace App\Http\Requests;
 
use Illuminate\Foundation\Http\FormRequest;
 
class StoreClientRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
 
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'surname' => ['nullable', 'string'],
            'email' => ['required', 'email'],
            'is_woman' => ['nullable', 'boolean'],
        ];
    }
}
