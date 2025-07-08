"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import type { Recipe } from "@/lib/recipes"

interface PrintRecipeProps {
  recipe: Recipe
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
}

export function PrintRecipe({ recipe, variant = "outline", size = "sm", showText = false }: PrintRecipeProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${recipe.title} - Recipe</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #f97316;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 2.5em;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .description {
              font-size: 1.2em;
              color: #6b7280;
              margin-bottom: 20px;
            }
            .meta {
              display: flex;
              justify-content: center;
              gap: 30px;
              margin-bottom: 20px;
            }
            .meta-item {
              text-align: center;
            }
            .meta-value {
              font-size: 1.5em;
              font-weight: bold;
              color: #f97316;
            }
            .meta-label {
              font-size: 0.9em;
              color: #6b7280;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 1.5em;
              color: #1f2937;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            .ingredients {
              columns: 2;
              column-gap: 30px;
            }
            .ingredient {
              margin-bottom: 8px;
              break-inside: avoid;
            }
            .instruction {
              margin-bottom: 15px;
              display: flex;
              gap: 10px;
            }
            .instruction-number {
              background: #f97316;
              color: white;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              flex-shrink: 0;
              margin-top: 2px;
            }
            .tags {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 20px;
            }
            .tag {
              background: #f3f4f6;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 0.9em;
              color: #374151;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${recipe.title}</h1>
            <p class="description">${recipe.description}</p>
            <div class="meta">
              <div class="meta-item">
                <div class="meta-value">${recipe.cookingTime}</div>
                <div class="meta-label">Minutes</div>
              </div>
              <div class="meta-item">
                <div class="meta-value">${recipe.servings}</div>
                <div class="meta-label">Servings</div>
              </div>
              <div class="meta-item">
                <div class="meta-value">${recipe.difficulty}</div>
                <div class="meta-label">Difficulty</div>
              </div>
              <div class="meta-item">
                <div class="meta-value">${recipe.rating}</div>
                <div class="meta-label">Rating</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Ingredients</h2>
            <div class="ingredients">
              ${recipe.ingredients
                .map(
                  (ingredient) => `
                <div class="ingredient">• ${ingredient}</div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Instructions</h2>
            ${recipe.instructions
              .map(
                (instruction, index) => `
              <div class="instruction">
                <div class="instruction-number">${index + 1}</div>
                <div>${instruction}</div>
              </div>
            `,
              )
              .join("")}
          </div>

          <div class="tags">
            ${recipe.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
          </div>

          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
  }

  return (
    <Button variant={variant} size={size} onClick={handlePrint} className="hover:bg-green-50 hover:border-green-200">
      <Printer className={`w-4 h-4 ${showText ? "mr-2" : ""}`} />
      {showText && "Print Recipe"}
    </Button>
  )
}
