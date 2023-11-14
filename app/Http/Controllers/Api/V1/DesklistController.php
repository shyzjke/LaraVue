<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DesklistStoreRequest;
use App\Models\Desklist;
use Illuminate\Http\Request;
use App\Http\Resources\DesklistResource;

class DesklistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $request->validate([
            'desk_id' => 'required|integer|exists:desks,id'
        ]);
        return DeskListResource::collection(Desklist::orderBy('created_at', 'desc')->where('desk_id', $request->desk_id)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DesklistStoreRequest $request)
    {
        $desklist = Desklist::create($request->validated());
 
        return new DesklistResource($desklist);
    }

    /**
     * Display the specified resource.
     */
    public function show(Desklist $desklist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Desklist $desklist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Desklist $desklist)
    {
        $desklist->delete();
 
        return response()->noContent();
    }
}
