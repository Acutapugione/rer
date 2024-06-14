const bid_form = document.querySelector('form#bid_form')
bid_form.addEventListener("submit", placeBid)

function placeBid(e) {
    e.preventDefault();
    const bidInput = e.target.querySelector("input")
    const lotId = bidInput.id
    // console.log("bidInput >> ",bidInput)
    // console.log("lotId >> ", lotId)

    fetch('/place_bid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lot_id: lotId,
            bid: parseFloat(bidInput.value)
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // alert('Ваша ставка прийнята!');
                refreshBid(data);
            } else {
                return
                // alert('Помилка: ' + data.error);
            }
        });
}


function refreshBid(data) {
    const lot_info = document.querySelector("div.lot-info")
    const current_price_label = lot_info.querySelector("span#current_price")
    const owner_label = lot_info.querySelector("span#owner")
    console.log("data >> ", data)
    console.log("lot_info >> ", lot_info)
    console.log("current_price_label >> ", current_price_label)
    console.log("owner_label >> ", owner_label)
    current_price_label.innerHTML = data.current_price
    owner_label.innerHTML = data.owner
}