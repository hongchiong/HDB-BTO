var React = require("react");
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {

    //Dynamic Generate Table To Display Result
    //Need To Count Blks and Generate Blks Column Header
    //Count Units and Generate Units Column Header
    //Count Levels And Generate Level Rows
    //

    const units = this.props[0].map((unit, i) => {
        return (
            <a href={`localhost:3000/${unit.id}`} class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{i + 1}</h5>
                </div>
                <div class="d-flex w-100 p-3 justify-content-center">
                    <h4 class="mb-1">{unit.unit_num}</h4>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <small>Selected: <b>{unit.selected ? 'Yes' : 'No'}</b></small>
                    <small>Blk: <b>{unit.blk_num}</b></small>
                </div>
            </a>
        );
    });

    return (
        <DefaultLayout>
            <div class="jumbotron">
                <h1 class="display-4">BTO</h1>
            </div>
            <div class="list-group">
                {units}
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
