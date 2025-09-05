// 動作をクラス化
class Eater {
  eat() {
    console.log('Eating...');
  }
}

class SoundMaker {
  makeSound() {
    console.log('Making sound...');
  }
}

class Biter {
  bite() {
    console.log('Biting...');
  }
}

class Scratcher {
  scratch() {
    console.log('Scratching...');
  }
}

class Flyer {
  fly() {
    console.log('Flying...');
  }
}

class Swimmer {
  swim() {
    console.log('Swimming...');
  }
}

// 動物クラスは必要な振る舞いを合成して持つ
class Animal {
  private eater = new Eater();

  eat() {
    this.eater.eat();
  }
}

// 犬クラスはEaterとBiterとSoundMakerを持つ
class Dog extends Animal {
  private biter = new Biter();
  private soundMaker = new SoundMaker();

  bite() {
    this.biter.bite();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// 猫クラスはEaterとScratcherとSoundMakerを持つ
class Cat extends Animal {
  private scratcher = new Scratcher();
  private soundMaker = new SoundMaker();

  scratch() {
    this.scratcher.scratch();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// 鳥クラスはEaterとFlyerとSoundMakerを持つ
class Bird extends Animal {
  private flyer = new Flyer();
  private soundMaker = new SoundMaker();

  fly() {
    this.flyer.fly();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// 魚クラスはEaterとSwimmerを持つ（鳴く振る舞いがない）
class Fish extends Animal {
  private swimmer = new Swimmer();

  swim() {
    this.swimmer.swim();
  }
}

// 使用例
const dog = new Dog();
dog.eat(); // Eating...
dog.bite(); // Biting...
dog.makeSound(); // Making sound...

const fish = new Fish();
fish.eat(); // Eating...
fish.swim(); // Swimming...
// fish.makeSound() は持たないので呼べない
