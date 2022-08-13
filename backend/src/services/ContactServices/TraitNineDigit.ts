interface Request {
  number: string;
}

const TraitNineDigit = async ({ number }: Request): Promise<string> => {
  number = number.replace("-", "").replace(" ", "");
  const ddi = number.substr(0, 2);
  const ddd = Number(number.substr(2, 2));
  let phone = number.substr(4, 14);
  if (ddi === "55" && ddd > 29 && phone.length > 8) {
    phone = phone.substr(1, 14);
  }

  return ddi + ddd.toString() + phone;
};

export default TraitNineDigit;
