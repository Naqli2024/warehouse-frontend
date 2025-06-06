export const numberToWords = (number, currency) => {
  const units = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (number === 0) return "Zero";
  if (number < 0) return `Minus ${numberToWords(Math.abs(number), currency)}`;

  const getWords = (n) => {
    if (n < 20) return units[n];
    if (n < 100)
      return `${tens[Math.floor(n / 10)]} ${n % 10 ? units[n % 10] : ""}`;
    return `${units[Math.floor(n / 100)]} Hundred ${
      n % 100 ? getWords(n % 100) : ""
    }`;
  };

  const crore = Math.floor(number / 10000000);
  const lakh = Math.floor((number % 10000000) / 100000);
  const thousand = Math.floor((number % 100000) / 1000);
  const rest = number % 1000;

  let result = "";
  if (crore) result += `${getWords(crore)} Crore `;
  if (lakh) result += `${getWords(lakh)} Lakh `;
  if (thousand) result += `${getWords(thousand)} Thousand `;
  if (rest) result += getWords(rest);

  const currencyName =
    currency === "INR"
      ? "Rupees"
      : currency === "USD"
      ? "Dollars"
      : currency === "SAR"
      ? "Riyal"
      : "Units";
  return result ? `${result} ${currencyName} Only` : "";
};
