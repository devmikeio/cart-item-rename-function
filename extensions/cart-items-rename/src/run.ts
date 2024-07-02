import type {
  RunInput,
  FunctionRunResult,
  CartOperation,
  ProductVariant
} from "../generated/api";

const NO_CHANGES: FunctionRunResult = {
  operations: [],
};

export function run(input: RunInput): FunctionRunResult {
  const operations: CartOperation[] = input.cart.lines.filter(
    line => line.merchandise.__typename ==="ProductVariant" && line.merchandise.product.title.includes(":")
  ).map(line => {
    return {
      update: {
        cartLineId: line.id,
        title: (line.merchandise as ProductVariant).product.title.split(":")[0]
      }
    }
  })
  return operations.length > 0 ? { operations } : NO_CHANGES;
};