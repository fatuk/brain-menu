# Brain-like 3d menu

## [Demo](https://fatuk.github.io/brain-menu/public)

## How to run?

* download this repo
* `npm install && bower install`
* for develop run `gulp`
* for build run `gulp build`
* open in browser `http://localhost:3000/`

## To remove images:

`sed 's/"url.*/===/g' <brain-v1.json >new-brain.json`


## Scene structure

brain-scene
light-group
main-group
brain-group
o-brain-1 g-brain-1 mat-brain-1
o-brain-2 g-brain-2 mat-brain-1
o-brain-3 g-brain-3 mat-brain-3
o-brain-4 g-brain-4 mat-brain-4
o-brain-5 g-brain-5 mat-brain-5
o-brain-6 g-brain-6 mat-brain-6
gears-group
o-gears-frame g-gears-frame mat-gear
o-gear-1 g-gear-1 mat-gear
o-gear-2 g-gear-2 mat-gear
o-gear-3 g-gear-3 mat-gear
o-gear-4 g-gear-4 mat-gear
o-gear-5 g-gear-5 mat-gear
