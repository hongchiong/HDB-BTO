var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    // console.log(this.props.btoData.allBlkNums);
    // console.log(this.props.btoData.allLevels);
    // console.log(this.props.btoData.allUnitNums);
    // console.log(this.props.btoData.allUnits);
    // console.log(this.props.btoData.unitsForLevel[2]);
    let abc = [
        {'433B': ['922', '908']},
        {'411A': ['1007', '1009']}
    ];

    const headerRow = this.props.btoData.unitsForUnitnum.map( (unitnum, ind, arr) => {
        return (
            <div class="col-sm-1 blk-colmuns">
                <div class="row blk-row">
                    <div class="col-sm text-center border blk-header">
                        {Object.keys(unitnum)}
                        {
                            unitnum[Object.keys(unitnum)].map( (unit, ind) =>{
                                return (
                                    <div class="col-sm text-center border unitheader">
                                        {unit.level}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    });

    const grid = this.props.btoData.unitsForUnitnum.map( (unitnum, ind, arr) => {
        return (
            <div class="col-sm-1 blk-colmuns">
                <div class="row blk-row">
                    <div class="col-sm text-center border blk-header">
                        {Object.keys(unitnum)}
                    </div>
                </div>
                <div class="row blk-row">
                    <div class="col-sm text-center border blk-header">
                        {
                            this.props.btoData.unitsForLevel.map( (levelnum, ind, arr) => {
                                return (
                                    <div class="col-sm text-center border unitheader">
                                        {
                                            levelnum[Object.keys(levelnum)].map( (unit, ind) => {
                                                if (unit.unitnum == Object.keys(unitnum)) {
                                                   return (
                                                        <div class="col-sm text-center border unitheader">
                                                            {
                                                                unit.unit
                                                            }
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
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
                    {grid}
                </div>
            </div>



        </DefaultLayout>
    );
  }
}

module.exports = Home;
