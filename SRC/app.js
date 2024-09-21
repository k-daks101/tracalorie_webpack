import './CSS/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css'; // Your own styles;

import CalorieTracker from './Tracker';
import {Meal, Workout} from './item';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // If you need Bootstrap's JS




 



class App
{
  constructor()
  {
    this._tracker  = new CalorieTracker();
    this._loadEventListeners()
    this._tracker.loadItems();
  }

  _loadEventListeners()
  {
    
    document.getElementById('meal-form')
    .addEventListener('submit', this._newMeal.bind(this)); //with bind, we can create parameters and pass in arguments

    document.getElementById('workout-form')
    .addEventListener('submit', this._newWorkout.bind(this, ));

    document.getElementById('meal-items')
    .addEventListener('click', this._removeItem.bind(this, 'meal'));

    document.getElementById('workout-items')
    .addEventListener('click', this._removeItem.bind(this, 'workout'));


    document.getElementById('filter-meals')
    .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

    document.getElementById('filter-workouts')
    .addEventListener('keyup', this._filterItems.bind(this, 'workout'));


    document.getElementById('reset')
    .addEventListener('click', this._reset.bind(this));


    document.getElementById('limit-form')
    .addEventListener('submit', this._setLimit.bind(this));
  }

    _newMeal(e)
    {
      e.preventDefault();

     

      const name = document.getElementById('meal-name');

      const calories = document.getElementById('meal-calories');

      //validate input

      if (name.value === '' || calories.value === '')
      {
        alert('Please fill ina ll fields');
        return;
      }


      const meal = new Meal(name.value, parseInt(calories.value));

      this._tracker.addMeal(meal);
    
      name.value = '';
      calories.value = '';

      //collapsing the section

      const collapseMeal = document.getElementById('collapse-meal');

      const bsCollapse = new Collapse(collapseMeal, 
        {
          toggle: true
        }
      )
    }


  
    _newWorkout(e)
    {
      e.preventDefault();

     

      const name = document.getElementById('workout-name');

      const calories = document.getElementById('workout-calories');

      //validate input

      if (name.value === '' || calories.value === '')
      {
        alert('Please fill ina ll fields');
        return;
      }


      const workout = new Workout(name.value, parseInt(calories.value));

      this._tracker.addWorkout(workout);
    
      name.value = '';
      calories.value = '';


      const collapseWorkout = document.getElementById('collapse-workout');

      const bsCollapse = new Collapse(collapseWorkout, 
        {
          toggle: true
        }
      )
    }

    _removeItem(type, e)
    {
      if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark'))
      {
        if (confirm('Are you sure?'))
        {
          const id = e.target.closest('.card').getAttribute('data-id');
          console.log(id);

           type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

          const item = e.target.closest('.card');

          e.target.closest('.card').remove();
          //console.log('delete');
        }
      }
    }

    _filterItems(type, e)
    {
      const text = e.target.value.toLowerCase();
      document.querySelectorAll(`#${type}-items .card`).forEach(item =>
      {
        const name = item.firstElementChild.firstElementChild.textContent;

        if (name.toLowerCase().indexOf(text) !== -1)
        {
          item.style.display = 'block';
        }
        else
        {
          item.style.display = 'none'
        }
      }
      )
    }


    _reset()
    {
      this._tracker.reset();
      document.getElementById('meal-items').innerHTML = '';

      document.getElementById('workout-items').innerHTML = '';

      document.getElementById('filter-meals').value = '';

      document.getElementById('filter-workouts').value = '';
    }



    _setLimit(e)
    {
      e.preventDefault();

      const limit = document.getElementById('limit');

      if(limit.value === '')
      {
        alert('Please add a limit');
        return;
      }

      this._tracker.setLimit(+limit.value); //when you pass data in a form, it comes as a string, so we put a + sign to get a number
      limit.value ='';

      const modalEl = document.getElementById('limit-modal');
      const modal = bootstrap.getInstance(modalEl);
      modal.hide();
    }
}

const app = new App()
/*
const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 500);

const lunch = new Meal('lunch', 5550);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout('Morning Run', 400);


tracker.addWorkout(run);

console.log(tracker._meals);

console.log(tracker._workouts);

console.log(tracker._totalCalories);

//console.log(Math.random()).toString(16).slice(2);


*/

//Just some notes:: we add, we add, we display, we load, and then we reuse