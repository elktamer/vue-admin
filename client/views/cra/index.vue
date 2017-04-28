<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table Responsive</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th></th>
                  <th>Open source projects</th>
                  <th>Year started</th>
                  <th colspan="3">Links</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Totals</th>
                  <th>Thurston</th>
                  <th>Ryan</th>
                  <th colspan="3">Nitz</th>
                </tr>
              </tfoot>
              <tbody>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import gapi from '../../../api-client'
const api = '/MODApis/Api/v2/InteractiveChart/json'
var CLIENT_ID = '202092006015-j6b70cvq260ltgm6ohurn2g5knajq8rt.apps.googleusercontent.com'

 // Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'

export default {
  components: {
    Chart
  },

  data () {
    return {
      params: {
        symbol: 'AAPL',
        numberOfDays: 450,
        dataPeriod: 'Month'
      },
      symbols: ['AAPL', 'MSFT', 'JNJ', 'GOOG'],
      periods: ['Day', 'Week', 'Month', 'Quarter', 'Year'],
      data: [],
      labels: [],
      isloading: false,
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }
    }
  },

  computed: {
    stockData () {
      return {
        labels: this.labels,
        datasets: [{
          fill: false,
          lineTension: 0.25,
          data: this.data,
          label: 'Close price',
          pointBackgroundColor: '#1fc8db',
          pointBorderWidth: 1
        }]
      }
    }
  },

  methods: {
    loadData () {
      this.isloading = true
      this.labels.length = 0
      this.data.length = 0
      this.$http({
        url: api,
        transformResponse: [(data) => {
          return JSON.parse(data.replace(/T00:00:00/g, ''))
        }],
        params: {
          parameters: {
            Normalized: false,
            NumberOfDays: parseInt(this.params.numberOfDays),
            DataPeriod: this.params.dataPeriod,
            Elements: [{'Symbol': this.params.symbol, 'Type': 'price', 'Params': ['c']}]
          }
        }
      }).then((response) => {
        let dates = response.data.Dates
        let price = response.data.Elements[0].DataSeries.close.values
        this.data.push(...price)
        this.labels.push(...dates)
        this.isloading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    initClient () {
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
          // Listen for sign-in state changes.
        // gapi.auth2.getAuthInstance().isSignedIn.listen(loadData)

          // Handle the initial sign-in state.
      })
    }
  }
}
</script>
<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
