var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    console.log(this.props.btoData.allBlkNums);

    console.log(this.props.btoData.allLevels);
    console.log(this.props.btoData.allUnitNums);
    console.log(this.props.btoData.allUnits);

    return (
        <DefaultLayout>
            <div class="container-fluid">
                <div class="row header-row" >
                    <div class="col-sm-1 lvl-column">
                        Level
                    </div>
                    {}
                </div>
            </div>



        </DefaultLayout>
    );
  }
}

module.exports = Home;
