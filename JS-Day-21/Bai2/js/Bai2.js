function Customer(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

function createCustomers(customers) {
  const result = customers.map((customer) => {
    const shortName = customer.name.split(" ")[0];
    return new Customer(
      customer.name,
      customer.age,
      customer.address,
      shortName
    );
  });

  result.sort((a, b) => a.age - b.age);

  return result;
}
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);

console.log(result);
