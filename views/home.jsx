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
                            Updated On: {blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getDate()}{blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getMonth()-1}-{blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getFullYear()}, {blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getHours()}:{blknum[Object.keys(blknum)][0][Object.keys(blknum[Object.keys(blknum)][0])][0].updated_on.getMinutes()}
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
                                                            <li class="list-group-item text-white" style={{backgroundColor: '#aa1729'}}>
                                                              {units.unit}
                                                            </li>
                                                        )
                                                    } else {
                                                        if (this.props.btoData.loggedinCookie == 'true') {
                                                            return (
                                                                <li class="list-group-item p-0 text-white">
                                                                    <form action="/unit" method="POST">
                                                                        <input type="hidden" name="track" value={units.id}/>
                                                                        <input type="submit" class="btn m-0 w-100 h-100 rounded-0 text-white" style={{backgroundColor: '#5bad5e'}} value={units.unit}/>
                                                                    </form>
                                                                </li>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <li class="list-group-item text-white" style={{backgroundColor: '#5bad5e'}}>
                                                                    {units.unit}
                                                                </li>
                                                            )
                                                        }
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

    const buttonsFalse = () => {
        return (
            <div class="justify-content-end">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="" data-toggle="modal" data-target="#signInModal">Sign In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="" data-toggle="modal" data-target="#signUpModal">Sign Up</a>
                    </li>
                </ul>
            </div>
            );
    };
    const buttonsTrue = () => {
        return (
            <form action="/users" method="POST">
                <input type="hidden" name="func" value="signout"/>
                <input type="submit" class="btn btn-danger" value="Sign Out"/>
            </form>
            );
    };

    return (
        <DefaultLayout buttons={(this.props.btoData.loggedinCookie == 'true') ? buttonsTrue : buttonsFalse}>
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