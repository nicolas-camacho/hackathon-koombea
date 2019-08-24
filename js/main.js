$(document).ready(function() {
  $('#filter_select').on('change', function() {
    let filter = $('#filter_select').val()
    list_products(filter)
  })
})

const get_data = () => {
  return new Promise(resolve => {
    fetch('https://limitless-beyond-13402.herokuapp.com/products')
      .then(response => response.json())
      .then(data => {
        resolve(data.items)
      })
  })
}

const list_products = async filter => {
  let init_products = await get_data()
  sort_products(init_products, filter)
  let all = ``
  init_products.forEach(element => {
    all = `${all}
    <div class="card">
        <img
            class="main_img"
            src="${element.photo}"
            alt="example"
        />
        <div class="content">
            <span class="city">${element.city}</span>
            <p class="name">${element.name}</p>
            <p class="price">Desde COP $${element.price}</>
        </div>
        <div class="card_foot">
            <span class="rate">
                <img class="star_icon"
                    src="../resources/icon/rating.svg"
                    height="14px"
                    width="14px"
                />
                <span class="rating">${element.rating} (${element.votes})</span>
            </span>
        </div>
    </div>`
  })

  $('.products').html(all)
}

const sort_products = (init_products, filter) => {
  if (filter == 'rating') {
    init_products.sort(function(a, b) {
      return b.rating - a.rating
    })
  } else if (filter == 'name') {
    init_products.sort(function(a, b) {
      let nameA = a.name.toUpperCase()
      let nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  } else if (filter == 'city') {
    init_products.sort(function(a, b) {
      let cityA = a.city.toUpperCase()
      let cityB = b.city.toUpperCase()
      if (cityA < cityB) {
        return -1
      }
      if (cityA > cityB) {
        return 1
      }
      return 0
    })
  } else if (filter == 'votes') {
    init_products.sort(function(a, b) {
      return b.votes - a.votes
    })
  }
}
