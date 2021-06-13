import { extend, localize } from "vee-validate";

import ru from "vee-validate/dist/locale/ru";
import * as rules from "vee-validate/dist/rules";

localize("ru", ru);

const needRules = [
  "min",
  "max",
  "email",
  "required",
  "image",
  "ext",
  "numeric",
  "between",
  "length",
  "size"
];

extend("dateformat", {
  validate(value) {
    // First check for the pattern
    if (value === null) return true;
    const pattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!pattern.test(value)) return false;
    // Parse the date parts to integers
    var parts = value.split(".");
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  },
  message: "Дата введена некорректно"
});

extend("decimal", {
  validate: (value, { decimals = "*", separator = "." } = {}) => {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    if (Number(decimals) === 0) {
      return /^-?\d*$/.test(value);
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );
    return regex.test(value);
  },
  params: ["decimals", "separator"],
  message: "Только десятичные числа и {decimals} знака после точки"
});

needRules.forEach(rule => {
  extend(rule, rules[rule]);
});
