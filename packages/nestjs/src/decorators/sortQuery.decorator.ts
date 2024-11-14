import { Transform } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

export type AllowedSortField<T> = {
  [K in keyof T]: T[K] extends (SortOrder | undefined) ? K : never;
}[keyof T];

export const SortOrder = {
  DESC: "desc",
  ASC: "asc"
} as const;

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export type SortField = {
  field: string;
  order: SortOrder;
};

/**
 * parse and validate the `sort` query parameter.
 * 
 * This decorator parses a comma-separated list of sort fields in the format `field:order` 
 * where `order` can either be "asc" or "desc", then transforms the string into a `SortField[]`,
 * or `SortField` object.
 *
 * From:
 * 
 * /items?sort=name:asc,createdAt:desc
 * 
 * To:
 * 
 * [
 *   { field: 'name', order: 'asc' },
 *   { field: 'createdAt', order: 'desc' }
 * ]
 */
const SortQuery = (fields: string[] = ["createdAt:asc"]) => (
  Transform(
    ({ value }) => (
      (typeof value !== "string")
        ? value
        : value.split(/\,\s?/).map((item) => parseSortField(fields, item))
    )
  )
);

const parseSortField = (allowedFields: string[], sortField: string): SortField => {
  const orders = Object.values(SortOrder);
  const pattern = new RegExp(`^([a-zA-Z0-9]+):(${orders.join("|")})$`);

  if (!sortField.match(pattern)) {
    throw new BadRequestException(
      `invalid sort pattern. allowed pattern: 'property:(${orders.join("|")})'`
    );
  }

  const [field = "", order] = sortField.trim().split(":");
  if (!allowedFields.includes(field)) {
    throw new BadRequestException(
      `invalid sort property: '${field}'. must be one of the following: ${allowedFields.join(", ")}`
    );
  }

  return {
    order: order as SortOrder,
    field: field.trim(),
  };
};

export {
  SortQuery as default,
  SortQuery
};