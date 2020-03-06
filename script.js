const store = {
    customerTip: 0,
    numOfMeals: 0,
};

const renderForm = () => {
    return `
    <section>
    <div class="meal-price">
        <label for="meal-price">Base Meal Price: $</label>
        <input type="number" name="price" placeholder="15.00" id="meal-price" required/>
    </div>
    <div class="tax-rate">
        <label for="tax-rate">Tax Rate: %</label>
        <input type="number" name="tax_rate" id="tax-rate" required/>
    </div>
    <div class="tip-percentage">
        <label for="tip-percentage">Tip Percentage: %</label>
        <input type="number" name="tip-percentage" id="tip-percentage" required>
    </div>
    <div class="buttons">
        <button type="submit" name="submit" id="submit">Submit</button>
        <button type="submit" name="cancel" id="cancel">Cancel</button>
    </div>
    </section>
    `;
};

const renderDefault = () => {
    return `
      <section>
      <div class="subtotal">
          <h4 class="title">Subtotal</h4>
          <h4 class="number">0.00</h4>
      </div> 
      <div class="tip">
          <h4 class="title">Tip</h4>
          <h4 class="number">0.00</h4>
      </div>
      <div class="total">
          <h4 class="title">Total</h4>
          <h4 class="number">0.00</h4>
      </div>
      </section>
    `;
};

const renderInfo = () => {
    return `
      <section>
      <div class="tip-total">
          <h4 class="title">Tip Total:</h4>
          <h4 class="number">0.00</h4>
      </div>
      <div class="meal-count">
          <h4 class="title">Meal Count:</h4>
          <h4 class="number">0</h4>
      </div>
      <div class="avg-tip-per-meal">
          <h4 class="title">Average Tip Per Meal:</h4>
          <h4 class="number">0.00</h4>
      </div>
      </section>
    `;
};

const showCharges = (priceOfMeal, tax, tipPercent) => {
    let subtotal = (parseInt(priceOfMeal) + (parseInt(priceOfMeal) * (tax / 100))).toFixed(2);
    let customerTip = (parseInt(priceOfMeal) * (tipPercent / 100)).toFixed(2);
    let total = parseInt(subtotal) + parseInt(customerTip);

    store.customerTip += parseFloat(customerTip);
    store.numOfMeals++;

    return `
    <section>
    <div class="subtotal">
      <h4 class="title">Subtotal</h4>
      <h4 class="number">${subtotal}</h4>
    </div> 
    <div class="tip">
      <h4 class="title">Tip</h4>
      <h4 class="number">${customerTip}</h4>
    </div>
    <div class="total">
      <h4 class="title">Total</h4>
      <h4 class="number">${total}</h4>
    </div>
    </section>
    `;
};

const showDetails = () => {
    let avg = store.customerTip / store.numOfMeals;
    let avgTip = avg.toFixed(2);

    let customerTip = store.customerTip.toFixed(2);

    return `
    <section>
    <div class="tip-total">
      <h4 class="title">Tip Total:</h4>
      <h4 class="number">${customerTip}</h4>
    </div>
    <div class="meal-count">
      <h4 class="title">Meal Count:</h4>
      <h4 class="number">${store.numOfMeals}</h4>
    </div>
    <div class="avg-tip-per-meal">
      <h4 class="title">Average Tip Per Meal:</h4>
      <h4 class="number">${avgTip}</h4>
    </div>
    </section>
    `;
};

const submitButtonListener = () => {
    $('form').on('click', '#submit', e => {
        e.preventDefault();

        let priceOfMeal = $('#meal-price').val();
        let tax = $('#tax-rate').val();
        let tipPercent = $('#tip-percentage').val();

        $('.charge-details').html(showCharges(priceOfMeal, tax, tipPercent));
        $('.earning-details').html(showDetails);
    });
};

const submitCancelListener = () => {
    $('form').on('click', '#cancel', e => {
        e.preventDefault();

        $('.charge-details').html(renderDefault());
        $('.meal-details').html(renderForm());
    });
};

const submitResetListener = () => {
    $('body').on('click', '#reset', e => {
        e.preventDefault();

        store.customerTip = 0;
        store.numOfMeals = 0;

        $('.charge-details').html(renderDefault());
        $('.meal-details').html(renderForm());
        $('.earning-details').html(renderInfo());
    });
};

const renderEventListeners = () => {
    submitButtonListener();
    submitCancelListener();
    submitResetListener();
};

const mainDisplay = () => {
    $('main').html(`<h1>WaitStaff Calculator</h1>

    <section>
    <div class="container">
        <div class="details">
            <h2>Enter the Meal Details</h2>
            <form class="meal-details">
                <div class="meal-price">
                    <label for="meal-price">Base Meal Price: $</label>
                    <input type="number" name="price" placeholder="15.00" id="meal-price" required />
                </div>
                <div class="tax-rate">
                    <label for="tax-rate">Tax Rate: %</label>
                    <input type="number" name="tax_rate" id="tax-rate" required />
                </div>
                <div class="tip-percentage">
                    <label for="tip-percentage">Tip Percentage: %</label>
                    <input type="number" name="tip-percentage" id="tip-percentage" required>
                </div>
                <div class="buttons">
                    <button type="submit" name="submit" id="submit">Submit</button>
                    <button type="submit" name="cancel" id="cancel">Cancel</button>
                </div>
            </form>
        </div>
        <div class="small-contianer">
            <div class="customer-charges">
                <h2>Customer Charges</h2>
                <div class="charge-details">
                    <div class="subtotal">
                        <h4 class="title">Subtotal</h4>
                        <h4 class="number">0.00</h4>
                    </div>
                    <div class="tip">
                        <h4 class="title">Tip</h4>
                        <h4 class="number">0.00</h4>
                    </div>
                    <div class="total">
                        <h4 class="title">Total</h4>
                        <h4 class="number">0.00</h4>
                    </div>
                </div>
            </div>
            <div class="earning-info">
                <h2>My Earnings Info</h2>
                <div class="earning-details">
                    <div class="tip-total">
                        <h4 class="title">Tip Total:</h4>
                        <h4 class="number">0.00</h4>
                    </div>
                    <div class="meal-count">
                        <h4 class="title">Meal Count:</h4>
                        <h4 class="number">0</h4>
                    </div>
                    <div class="avg-tip-per-meal">
                        <h4 class="title">Average Tip Per Meal:</h4>
                        <h4 class="number">0.00</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="submit" name="reset" id="reset">Reset</button>
    </section>`)



}

function renderApp() {

    mainDisplay();
    renderEventListeners();

}

renderApp();
