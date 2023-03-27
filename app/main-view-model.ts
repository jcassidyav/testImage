import { Observable } from '@nativescript/core';
import * as imagepicker from "@nativescript/imagepicker";
import { ImageSource, ImageAsset, Image } from "@nativescript/core";

export class HelloWorldModel extends Observable {
  private _counter: number;
  private _message: string;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value);
    }
  }

  onTap() {
    this._counter--;
    this.updateMessage();
    const context = imagepicker.create({
      mode: "single",
      maximumNumberOfSelection: 1,
      mediaType: imagepicker.ImagePickerMediaType.Image
  });
  
      context
          .authorize()
          .then(() => {
            return context.present().then(selection=>{
              const imageAsset = selection.length > 0 ? selection[0] : null;
              return ImageSource.fromAsset(imageAsset)
              .then((v) => console.log("Got Image Source"))
              
            })
          }).catch((e) => console.log("Did not get imagesource", e));
          
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message =
        'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }

    // log the message to the console
    console.log(this.message);
  }
}
