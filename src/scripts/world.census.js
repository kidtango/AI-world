'use strict';
/**
 * @module Census
 * @requires lodash
 */
/**
 * Species census
 */
/**
 * @typedef  {Object} Census - Population by species
 * @property {number} red    - Red population
 * @property {number} green  - Green population
 * @property {number} blue   - Blue population
 */
class Census {
    constructor() {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.births = 0;
        this.deaths = 0;
    }

    /**
     * Clears the log and shows the census results
     */
    log(world) {
        this.update(world);
        $('#population').text(world.creatures.length);

        console.clear();
        console.log('%c==================================', 'color: #777');
        console.log(`%c Red   : ${this.red}`, 'color: rgb(255, 100, 100)');
        console.log(`%c Reproduction chance ${world.reproductionChance.red}`, 'color: rgb(255, 100, 100)');
        console.log(`%c Green  : ${this.green}`, 'color: rgb(100, 255, 100)');
        console.log(`%c Reproduction chance ${world.reproductionChance.green}`, 'color: rgb(100, 255, 100)');
        console.log(`%c Blue : ${this.blue}`, ' color: rgb(100, 100, 255)');
        console.log(`%c Reproduction chance ${world.reproductionChance.blue}`, 'color: rgb(100, 100, 255)');
        console.log(` Population: ${world.creatures.length}`);

        if (this.births > 0)
            console.log(` Births: ${this.births}`);
        if (this.deaths > 0)
            console.log(` Deaths ${this.deaths}`);
        if (world.creatures.length >= world.topPopulation)
            console.log(`%c Overpopulation after ${world.cycles} cycles!`, 'color: rgb(255, 150, 150)');
        if (world.creatures.length === 0)
            console.log(`%c Extintion after ${world.cycles} cycles!`, 'color: rgb(255, 150, 150)');

        console.log('%c==================================', 'color: #777');
    }

    /**
     * Calculates population by species
     */
    update(world) {
        this.reset();

        this._index = world.creatures.length;
        while (this._index--)
            this[world.creatures[this._index].species] ++;
    }

    /**
     * Return counts results to inital state
     */
    reset() {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }

    /**
     * Returns the least populated species
     */
    minority() {
        return _.minBy(
            this.list(),
            'population'
        );
    }

    /**
     * Returns the most populated species
     */
    mayority() {
        return _.maxBy(
            this.list(),
            'population'
        );
    }

    /**
     * Census list
     */
    list() {
        return [
            {
                species: 'red',
                population: this.red
            },
            {
                species: 'green',
                population: this.green
            },
            {
                species: 'blue',
                population: this.blue
            }
        ];
    }
}
