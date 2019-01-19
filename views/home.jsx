var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    // console.log(this.props.btoData.allBlkNums);
    // console.log(this.props.btoData.allLevels);
    // console.log(this.props.btoData.allUnitNums);
    // console.log(this.props.btoData.allUnits);

    let abc = [
        {'433B': ['922', '908']},
        {'411A': ['1007', '1009']}
    ];

    const headerRow = abc.map( (blk, ind, arr) => {
        return (
            <div class="col-sm-1 blk-colmuns">
                <div class="row blk-row">
                    <div class="col-sm text-center border blk-header">
                        {Object.keys(blk)}
                    </div>
                </div>
                <div class="row unit-row">
                    {
                        blk[Object.keys(blk)].map( (unit) =>{
                            return (
                                <div class="col-sm-6 text-center border unitheader">
                                    {unit}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    });

    return (
        <DefaultLayout>
            <div class="container-fluid">
                <div class="row header-row" >
                    <div class="col-sm-1 text-center lvl-column">
                        Level
                    </div>
                    {headerRow}
                </div>
            </div>



        </DefaultLayout>
    );
  }
}

module.exports = Home;
