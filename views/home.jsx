var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {
    // const headerRow = blksArr.map(blk => {
    //     return (
    //         <div class="row header-row">
    //             <div class="col-sm-1 lvl-column">
    //                 Level
    //             </div>
    //             <div class="col-sm blk-colmuns">
    //                 <div class="row blk-row">
    //                     <div class="col-sm blk-header">
    //                         431C
    //                     </div>
    //                 </div>
    //                 <div class="row unit-row">
    //                     <div class="col-sm unit-header">
    //                         unit 1
    //                     </div>
    //                     <div class="col-sm unit-header">
    //                         unit 2
    //                     </div>
    //                     <div class="col-sm unit-header">
    //                         unit 3
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // });

    //FUNCTION TO REMOVE DUPLICATES FROM ARRAY
    const rmDups = (arr) => arr.filter((v,i) => arr.indexOf(v) === i);

    const blkHeaders = this.props.homes.map((blk)=>{
        let blocknum = Object.keys(blk)[0]
        let unitsArr = [];
        return (
            <div class="col-sm blk-colmuns">
                <div class="row blk-row">
                    <div class="row blk-row">
                        <div class="col-sm blk-header">
                            {blocknum}
                        </div>
                    </div>
                    <div class="row unit-row">
                        {
                            blk[blocknum].map(unit => {
                            unitsArr.push(unit.unit_num.substr(4));
                            unitsArr = rmDups(unitsArr).sort();
                            console.log(unitsArr);
                            return unitsArr.map(unitNum => {
                                return (
                                    <div class="col-sm unit-header">
                                        {unitNum}
                                    </div>
                                )
                            })
                        })}
                    </div>
                </div>
            </div>
            )
    })

    return (
        <DefaultLayout>
            <div class="container-fluid">
                <div class="row header-row" >
                    <div class="col-sm-1 lvl-column">
                        Level
                    </div>
                    {blkHeaders}
                </div>
            </div>



        </DefaultLayout>
    );
  }
}

module.exports = Home;
