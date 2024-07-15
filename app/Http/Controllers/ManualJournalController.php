<?php

namespace App\Http\Controllers;

use App\Http\Resources\ManualJournalResource;
use App\Models\ManualJournal;
use Exception;
use Illuminate\Http\Request;

class ManualJournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Manual Journals retrieved successfully',
            'result' => ManualJournalResource::collection(ManualJournal::paginate($request->limit ?? 10))
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $manualJournal = new ManualJournal();
            $manualJournal->manual_journal_number = $request->manual_journal_number;
            $manualJournal->manual_journal_date = $request->manual_journal_date;
            $manualJournal->description = $request->description;
            $manualJournal->notes = $request->notes;
            $manualJournal->save();

            return response()->json([
                'success' => true,
                'message' => 'Manual Journal created successfully',
                'result' => ManualJournalResource::make($manualJournal)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Manual Journal retrieved successfully',
            'result' => ManualJournalResource::make(ManualJournal::findOrFail($id))
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ManualJournal $manualJournal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ManualJournal $manualJournal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManualJournal $manualJournal)
    {
        //
    }
}
