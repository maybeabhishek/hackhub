var Etage = function(p5, position, originalSize, floor) {

    this.position = position;
    this.originalSize = originalSize;
    this.size = this.originalSize;
    this.color;
    this.floor = floor;
    this.state = 1;
  
    this.setup = function(color) {
      this.color = color;
    };
  
    this.run = function() {
      this.update();
      this.display();
    };
  
    // Method to display
    this.display = function() {
  
      if (this.state == 0) {
        p5.stroke(0);
        p5.fill(51);
        p5.ellipse(this.position.x, this.position.y, this.size, this.size);
        p5.text(this.floor, position.x - 3, position.y + 4);
      } else if (this.state == 1) {
        p5.stroke(this.color.x, this.color.y, this.color.z);
        p5.fill(51);
        p5.ellipse(this.position.x, this.position.y, this.size, this.size);
        p5.fill(0);
        p5.text(this.floor, position.x - 3, position.y + 4);
      }
    };
  
    this.update = function() {
  
    };
  
    //getters 
    this.setPosition = function(x, y) {
      this.position.x = x;
      this.position.y = y;
    };
  
    //setters
    this.getPosition = function() {
      return this.position;
    }
  
    this.getColor = function() {
      return this.color;
    };
  
    this.getState = function() {
      return this.state;
    };
  
    this.getFloor = function() {
      return this.floor;
    };
  
    this.setState = function(newState) {
      this.state = newState;
    };
  
  };
  
  var Trajet = function(p5, etagesPosition, etageStart, etageEnd, stepWidth) {
  
    this.start = etagesPosition[etageStart];
    this.end = etagesPosition[etageEnd];
    this.orientation = 1;
    this.middle = 0;
    this.state = 1;
    this.etageStart = etageStart;
    this.color = p5.createVector(255, 255, 255);
    this.step = {
      max: 40,
      current: 0
    };
  
    this.setup = function(etage) {
      this.middle = this.findMiddle();
      console.log(this.middle);
      this.r1 = p5.random(0, this.middle);
      this.r2 = p5.random(0, this.middle);
      this.rh = p5.random(0, this.middle / 8);
  
      console.log("etage", etage);
  
      this.color = etage.getColor();
      var r = parseInt(p5.random(4, 6))
      this.step.max = this.middle * r;
  
    };
  
    this.run = function() {
      this.display();
    };
  
    // Method to display
    this.display = function() {
  
      if (this.state == 0) {
        p5.stroke(this.color.x, this.color.y, this.color.z, 20);
        p5.fill(this.color.x, this.color.y, this.color.z, 0);
      } else if (this.state == 1) {
        p5.stroke(this.color.x, this.color.y, this.color.z, 80);
        p5.fill(this.color.x, this.color.y, this.color.z, 20);
      } else if (this.state == 2) {
        p5.stroke(this.color.x, this.color.y, this.color.z, 255);
        p5.fill(this.color.x, this.color.y, this.color.z, 30);
      }
  
      var bezierVariation1 = this.middle - this.r1;
      var bezierVariation2 = this.middle + this.r2;
      var hauteur = this.middle + this.rh;
  
      if (etageStart < etageEnd) {
  
        p5.bezier(
          this.start.x, this.start.y,
          this.start.x + bezierVariation1, this.start.y - hauteur,
          this.start.x + bezierVariation2, this.start.y - hauteur,
          this.end.x, this.end.y
        );
  
        var t = this.step.current / this.step.max;
        var x = p5.bezierPoint(this.start.x, this.start.x + bezierVariation1, this.start.x + bezierVariation2, this.end.x, t);
        var y = p5.bezierPoint(this.start.y, this.start.y - hauteur, this.start.y - hauteur, this.end.y, t);
  
      } else {
        p5.bezier(
          this.start.x, this.start.y,
          this.start.x - bezierVariation1, this.start.y + hauteur,
          this.start.x - bezierVariation2, this.start.y + hauteur,
          this.end.x, this.end.y
        );
  
        var t = this.step.current / this.step.max;
        var x = p5.bezierPoint(this.start.x, this.start.x - bezierVariation1, this.start.x - bezierVariation2, this.end.x, t);
        var y = p5.bezierPoint(this.start.y, this.start.y + hauteur, this.start.y + hauteur, this.end.y, t);
  
      }
  
      p5.ellipse(x, y, 5, 5);
  
      if (this.step.current > this.step.max) {
        this.step.current = 0;
      }
  
      this.step.current++;
    }
  
    //Helpers
    this.findMiddle = function() {
      var lenght;
      console.log(etageStart);
      if (etageStart < etageEnd) {
        var lenght = ((etageEnd - etageStart) * stepWidth) / 2;
      } else {
        var lenght = ((etageStart - etageEnd) * stepWidth) / 2;
      }
      return lenght;
    };
  
    this.setColor = function() {
  
    };
  
    this.setState = function(state) {
      this.state = state;
    };
  
    this.getEtageStart = function() {
      return this.etageStart;
    };
  
  };
  
  var EtageManager = function(p5, width, height) {
  
    this.stepWidth = (width / 7) - 30;
    this.etages = [];
    this.etagesPosition = [];
    this.size = 30;
    this.top = height / 2;
    this.color = [];
  
    this.setup = function() {
      this.color[0] = p5.createVector(81, 159, 204);
      this.color[1] = p5.createVector(137, 147, 153);
      this.color[2] = p5.createVector(126, 255, 233);
      this.color[3] = p5.createVector(255, 199, 190);
      this.color[4] = p5.createVector(204, 81, 85);
      this.color[5] = p5.createVector(63, 127, 116);
      this.color[6] = p5.createVector(101, 127, 123);
      this.color[7] = p5.createVector(255, 232, 126);
  
      for (var i = 0; i <= 7; i++) {
        var position = p5.createVector(this.stepWidth * (i + 1), this.top);
        this.etages.push(new Etage(p5, position, this.size, i, this.trajets));
        this.etages[i].setup(this.color[i]);
        this.etagesPosition.push(position);
      };
    };
  
    this.run = function() {
      this.display();
    };
  
    this.display = function() {
      for (var i = 0; i <= 7; i++) {
        this.etages[i].update();
        this.etages[i].display();
      };
    };
  
    //GETTERs 
  
    this.getEtages = function(floor) {
      return this.etages[floor];
    }
  
    this.getAll = function() {
      return this.etages;
    };
  
    this.getEtagePostions = function() {
      return this.etagesPosition;
    }
  
    this.getStepWidth = function() {
      return this.stepWidth;
    };
  
    this.setState = function(newState, floor) {
      this.etages[floor].setState(newState);
    }
  
  };
  
  var TrajetManager = function(p5, width, height) {
  
    this.stepWidth = (width / 7) - 30;
    this.etages = [];
    this.etagesPosition = [];
    this.trajets = [];
    this.etages;
    this.sliderValue = 0;
  
    this.setup = function(etagesManager) {
  
      var randomTime = parseInt(p5.random(20, 50));
      this.sliderValue = randomTime;
  
      //init trajets
      for (var i = 0; i < randomTime; i++) {
        var randomEtageStart = parseInt(p5.random(0, 8));
        var randomEtageEnd = parseInt(p5.random(0, 8));
  
        var floor = etagesManager.getEtages(randomEtageStart);
        var positions = etagesManager.getEtagePostions();
        var stepWidth = etagesManager.getStepWidth();
  
        this.trajets.push(new Trajet(p5, positions, randomEtageStart, randomEtageEnd, stepWidth));
        this.trajets[i].setup(floor);
      };
  
    };
  
    this.run = function() {
      this.update();
      this.display();
    };
  
    this.update = function() {
  
    };
  
    this.display = function() {
  
      for (var i = this.sliderValue - 1; i >= 0; i--) {
        var trajet = this.trajets[i];
        trajet.run();
      }
    };
  
    this.getAll = function() {
      return this.trajets;
    }
  
    this.getTrajetsByFloor = function(floor) {
      var allTrajetsByFloor = [];
      for (var i = 0; i < this.trajets.length; i++) {
        var trajet = this.trajets[i];
        if (trajet.getEtageStart() == floor) {
          allTrajetsByFloor.push(trajet);
        }
      };
  
      return allTrajetsByFloor;
    }
  
    this.getSize = function() {
      return this.trajets.length;
    };
  
    this.setAllState = function(newState) {
      for (var i = this.trajets.length - 1; i >= 0; i--) {
        var trajet = this.trajets[i];
        trajet.setState(newState);
      }
    };
  
    this.setAllStateByFloor = function(newState, floor) {
      for (var i = this.trajets.length - 1; i >= 0; i--) {
        var trajet = this.trajets[i];
        if (trajet.getEtageStart() == floor) {
          trajet.setState(newState);
        }
      }
    };
  
    this.setSliderValue = function(newSliderValue) {
      this.sliderValue = newSliderValue;
    };
  
  };
  
  var EventManager = function(p5, etageManager, trajetManager) {
  
    this.isSelected = false;
    this.selectedEtage = 0;
    this.radios = [];
    this.slider = null;
  
    this.setup = function() {
      this.setupSlider();
    };
  
    this.run = function() {
      this.radioButton();
      this.sliderManager();
    };
  
    //SLIDER
    this.setupSlider = function() {
      var sizeSlider = trajetManager.getSize();
      this.slider = p5.createSlider(0, sizeSlider, sizeSlider);
    };
    this.sliderManager = function() {
      var sliderValue = this.slider.value();
      trajetManager.setSliderValue(sliderValue);
    };
  
    //RADIO BUTTONS
    this.radioButton = function() {
  
      var radioValues = p5.getElement("checkbox").elt.children;
  
      for (var i = 0; i < radioValues.length; i++) {
        var radioValue = radioValues[i];
        if (radioValue.checked) {
          this.radios[i] = 1;
        } else {
          this.radios[i] = 0;
        }
      };
  
      var noneSelected = true;
  
      for (var i = 0; i < radioValues.length - 1; i++) {
        if (this.radios[i] == 1) {
          trajetManager.setAllStateByFloor(2, i);
          etageManager.setState(1, i);
          noneSelected = false;
        } else {
          trajetManager.setAllStateByFloor(0, i);
          etageManager.setState(0, i);
        }
      };
  
      if (noneSelected) {
        for (var i = 0; i < radioValues.length - 1; i++) {
          trajetManager.setAllStateByFloor(1, i);
          etageManager.setState(1, i);
        };
      }
  
    };
  };
  
  var sketch = function(p5) {
  
    var width = 700;
    var height = 450;
    var x = width / 2;
    var y = height / 2;
  
    var etageManager = new EtageManager(p5, width, height);
    var trajetManager = new TrajetManager(p5, width, height);
    var eventManager = new EventManager(p5, etageManager, trajetManager);
  
    p5.setup = function() {
  
      var canvas = p5.createCanvas(width, height);
      canvas.parent('canvasHolder');
      p5.background(51);
      p5.smooth();
      p5.frameRate(30);
  
      etageManager.setup();
      trajetManager.setup(etageManager);
      eventManager.setup();
  
    };
  
    p5.draw = function() {
      p5.background(51);
      trajetManager.run();
      etageManager.run();
      eventManager.run();
  
    };
  
  };
  
  var myp5 = new p5(sketch);