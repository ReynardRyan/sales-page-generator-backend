<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('product_name');
            $table->text('description');
            $table->jsonb('key_features')->default('[]');
            $table->string('target_audience');
            $table->string('price');
            $table->text('unique_selling_points');
            $table->string('headline')->nullable();
            $table->string('subheadline')->nullable();
            $table->jsonb('benefits')->default('[]');
            $table->jsonb('features_output')->default('[]');
            $table->text('social_proof')->nullable();
            $table->string('pricing_text')->nullable();
            $table->string('cta_text')->nullable();
            $table->longText('full_content')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_pages');
    }
};
