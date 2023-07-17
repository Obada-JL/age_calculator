const input_elements = document.querySelectorAll(".card__input");
const submit_button = document.querySelector(".card__button");

const valid_day = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
  return false;
};
const valid_month = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
  return false;
};
const valid_year = (year) => {
  const current_year = new Date().getFullYear();
  if (year && year > 0 && year <= current_year) {
    return true;
  }
  return false;
};
const is_date_valid = (day_element, month_element, year_element) => {
  let is_valid = [false, false, false];

  if (!valid_day(day_element.value)) {
    day_element.classList.add("card__input--error");
  } else {
    is_valid[0] = true;
    day_element.classList.remove("card__input--error");
  }
  if (!valid_month(month_element.value)) {
    month_element.classList.add("card__input--error");
  } else {
    is_valid[1] = true;
    month_element.classList.remove("card__input--error");
  }
  if (!valid_year(year_element.value)) {
    year_element.classList.add("card__input--error");
  } else {
    is_valid[2] = true;
    year_element.classList.remove("card__input--error");
  }

  return is_valid.every((item) => item === true);
};

const calculate_age = (year, month, day) => {
  const today = new Date();
  const birth_day = new Date(year, month - 1, day);
  let age = today.getFullYear() - birth_day.getFullYear();
  const month_diff = today.getMonth() - birth_day.getMonth();

  if (
    month_diff < 0 ||
    (month_diff === 0 && today.getDate() < birth_day.getDate())
  ) {
    age--;
  }
  return age;
};

const on_Click_Handler = () => {
  const day_element = document.querySelector('.card__input[name="day"]');
  const month_element = document.querySelector('.card__input[name="month"]');
  const year_element = document.querySelector('.card__input[name="year"]');
  const result_element = document.querySelector(".card__resultValue");

  if (!is_date_valid(day_element, month_element, year_element)) {
    result_element.textContent = "--";
    return;
  }
  result_element.textContent = calculate_age(
    year_element.value,
    month_element.value,
    day_element.value
  );
};

input_elements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    event.key === "Enter" && on_Click_Handler;
  });
});
submit_button.addEventListener("click", on_Click_Handler);
