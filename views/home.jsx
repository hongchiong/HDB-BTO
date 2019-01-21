var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {
    const units = this.props.btoData.unitsForUnitnum.map( (unitnum, ind, arr) => {
        return (
            <div class="card text-white bg-primary m-2" style={{maxWidth: '8.8rem',minWidth: '8.8rem' , borderRadius: '0px', padding: '0px'}}>
                <div class="card-header text-center">
                    {Object.keys(unitnum)}
                </div>
                <div class="list-group">
                    {
                        unitnum[Object.keys(unitnum)].map( (unit, ind) =>{
                            return (
                                  <a href="#" class="list-group-item list-group-item-action list-group-item-primary text-center" style={{borderRadius: "0px"}}>
                                    <h5 class="mb-1">{unit.unit}</h5>
                                    <small>{`Date: ${unit.updated_on.getDate()}-${unit.updated_on.getMonth()+1}-${unit.updated_on.getFullYear()}`}</small>
                                  </a>
                            )
                        })
                    }
                </div>
            </div>
        )
    });

    const unitsInBlk = this.props.btoData.unitsInUnitnumInBlk.map( (blknum) => {
        return (
            <div class="card m-2" style={{borderRadius: '0px', padding: '0px'}}>
                <div class="card-header text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <h2>Blk: {Object.keys(blknum)}</h2>
                        </div>
                        <small>
                            Updated On: {blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getDate()}-{blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getMonth()-1}-{blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getFullYear()}
                        </small>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        {
                            blknum[Object.keys(blknum)].map((unitObj) => {
                                return  (
                                    <ul class="list-group col-sm col-md text-center">
                                        <li class="list-group-item">
                                            <h3>Unit: {Object.keys(unitObj)}</h3>
                                        </li>
                                            {
                                                unitObj[Object.keys(unitObj)].map(units => {
                                                    if (units.selected) {
                                                         return (
                                                            <li class="list-group-item" style={{backgroundColor: '#cc1100'}}>
                                                              {units.unit}
                                                            </li>
                                                        )
                                                    } else {
                                                        return (
                                                            <li class="list-group-item">
                                                              {units.unit}
                                                            </li>
                                                        )
                                                    }

                                                })
                                            }
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    });

    const blks = this.props.btoData.allBlkNums.map((blknum) => {
        return (
                <li class="nav-item">
                    <a class="nav-link" href={`${blknum}`}>{blknum}</a>
                </li>
            )
    });

    return (
        <DefaultLayout>
            <nav class="navbar sticky-top navbar-light bg-light justify-content-center">
                <ul class="nav">
                    {blks}
                </ul>
            </nav>
            <div class="container">
                {unitsInBlk}
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Home;




//GRID TEST CODE
    // const grid = this.props.btoData.unitsForUnitnum.map( (unitnum, ind, arr) => {
    //     return (
    //         <div class="col-sm-1 blk-colmuns">
    //             <div class="row blk-row">
    //                 <div class="col-sm text-center border blk-header">
    //                     {Object.keys(unitnum)}
    //                 </div>
    //             </div>
    //             <div class="row blk-row">
    //                 <div class="col-sm text-center border blk-header">
    //                     {
    //                         this.props.btoData.unitsForLevel.map( (levelnum, ind, arr) => {
    //                             return (
    //                                 <div class="col-sm text-center border unitheader">
    //                                     {
    //                                         levelnum[Object.keys(levelnum)].map( (unit, ind) => {
    //                                             if (unit.unitnum == Object.keys(unitnum)) {
    //                                                return (
    //                                                     <div class="col-sm text-center border unitheader">
    //                                                         {
    //                                                             unit.unit
    //                                                         }
    //                                                     </div>
    //                                                 )
    //                                             }
    //                                         })
    //                                     }
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //             </div>
    //         </div>
    //         )
    // });