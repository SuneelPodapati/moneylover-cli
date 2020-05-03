module.exports.command = 'events'
module.exports.describe = 'Get all the events'
module.exports.builder = (yargs) => yargs
  .option('running', {
    describe: 'Show only running events',
    alias: 'r',
  })

module.exports.handler = async (argv) => {
  const Table = require('cli-table3')
  const { getMoneyLover } = require('../util')
  const MoneyLover = require('../moneylover')

  const ml = await getMoneyLover()
  let events = (await ml.getEvents()).filter(x => x.type === 6)
  if(argv.running){
    events = events.filter(x => x.status === false)
  }
  const table = new Table({
    chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
    head: ['Name']
  })
  for (const event of events) {
    table.push([event.name])
  }
  console.log(table.toString())
}
