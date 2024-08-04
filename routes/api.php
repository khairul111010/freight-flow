<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankAccountsController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\ChargesController;
use App\Http\Controllers\ChartOfAccountController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ManualJournalController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Models\Bank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, "login"]);


// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/refresh-access-token', [AuthController::class, "refresh"]);

    Route::get('/users', [UserController::class, '']);

    Route::post('/logout', [AuthController::class, "logout"]);

    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index']);
        Route::post('/', [CustomerController::class, 'store']);
        Route::get('/{id}', [CustomerController::class, 'show']);
        Route::patch('/{id}', [CustomerController::class, 'update']);
        Route::delete('/{id}', [CustomerController::class, 'destroy']);
    });

    Route::prefix('invoices')->group(function () {
        Route::get('/', [InvoiceController::class, 'index']);
        Route::post('/', [InvoiceController::class, 'store']);
        Route::get('/{id}', [InvoiceController::class, 'show']);
        Route::get('/search/{invoice_number}', [InvoiceController::class, 'search']);
        Route::get('/customer/{id}', [InvoiceController::class, 'getInvoiceByCustomer']);
        Route::put('/{id}', [InvoiceController::class, 'update']);
        Route::delete('/{id}', [InvoiceController::class, 'destroy']);
    });

    Route::prefix('vendors')->group(function () {
        Route::get('/', [VendorController::class, 'index']);
        Route::post('/', [VendorController::class, 'store']);
        Route::get('/{id}', [VendorController::class, 'show']);
        Route::patch('/{id}', [VendorController::class, 'update']);
        Route::delete('/{id}', [VendorController::class, 'destroy']);
    });


    Route::prefix('charges')->group(function () {
        Route::get('/', [ChargesController::class, 'index']);
        Route::post('/', [ChargesController::class, 'store']);
        Route::get('/{id}', [ChargesController::class, 'show']);
        Route::put('/{id}', [ChargesController::class, 'update']);
        Route::delete('/{id}', [ChargesController::class, 'destroy']);
    });

    Route::prefix('manual-journals')->group(function () {
        Route::get('/', [ManualJournalController::class, 'index']);
        Route::post('/', [ManualJournalController::class, 'store']);
        Route::get('/{id}', [ManualJournalController::class, 'show']);
        Route::put('/{id}', [ManualJournalController::class, 'update']);
        Route::delete('/{id}', [ManualJournalController::class, 'destroy']);
    });

    Route::prefix('bank')->group(function () {
        Route::get('/', [BankController::class, 'index']);
        Route::post('/', [BankController::class, 'store']);
        Route::get('/{id}', [BankController::class, 'show']);
        Route::patch('/{id}', [BankController::class, 'update']);
        Route::delete('/{id}', [BankController::class, 'destroy']);
    });

    Route::prefix('bank-account')->group(function () {
        Route::get('/', [BankAccountsController::class, 'index']);
        Route::post('/', [BankAccountsController::class, 'store']);
        Route::get('/{id}', [BankAccountsController::class, 'show']);
        Route::patch('/{id}', [BankAccountsController::class, 'update']);
        Route::delete('/{id}', [BankAccountsController::class, 'destroy']);
    });

    Route::prefix('organizations')->group(function () {
        Route::get('/', [OrganizationController::class, 'index']);
        // Route::post('/', [OrganizationController::class, 'store']);
        Route::post('/{id}', [OrganizationController::class, 'update']);
        // Route::delete('/{id}', [OrganizationController::class, 'destroy']);
    });

    Route::prefix(('chart-of-accounts'))->group(function () {
        Route::get('/', [ChartOfAccountController::class, 'index']);
        Route::get('/tags/{tagName}', [ChartOfAccountController::class, 'getAccountsByTag']);
        Route::post('/', [ChartOfAccountController::class, 'store']);
        Route::get('/{id}', [ChartOfAccountController::class, 'show']);
        Route::put('/{id}', [ChartOfAccountController::class, 'update']);
        Route::delete('/{id}', [ChartOfAccountController::class, 'destroy']);
    });
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
