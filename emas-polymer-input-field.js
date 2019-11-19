import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `emas-polymer-input-field`
 * An input field made with Polymer 3.0
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EmasPolymerInputField extends PolymerElement {
  static get properties() {
    return {
      fieldName: {
        type: String,
        value: 'Input field',
      },

      placeholderText: {
        type: String,
        value: 'Please submit data',
      },

      displayedInputData: {
        type: String,
        value: 'Submit data to change this text',
      },

      dropdownValues: {
        type: Array,
        value: []
      },

      dropdownValueRequired: {
        type: Boolean,
        value: false,
      },

      displayDropdownValueRequiredMessage: {
        type: Boolean,
        value: false,
      },

      maxCharacters: {
        type: Number,
        value: undefined,
      },

      maxCharactersBoolean: {
        type: Boolean,
        value: false,
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host { display: block; }

        .alert { 
          color: var(--alert-color, red);
        }

        .title { 
          color: var(--title-color, rgb(102, 102, 102));
          font-size: var(--title-font-size, 16px);
          text-align: var(--title-text-align, left);
        }

        #emasPolymerInputField { 
          font-family: var(--emasPolymerInputField-font, 'Roboto', sans-serif);
          border-style: var(--emasPolymerInputField-border-style, solid);
          border-width: var(--emasPolymerInputField-border-width, 1px);
          border-color: var(--emasPolymerInputField-border-color, rgb(102, 102, 102));
          display: var(--emasPolymerInputField-display, block);
          overflow: hidden;
          background-color: var(--emasPolymerInputField-background-color, transparent);
        }

        .content { 
          margin-left: 5px;
          margin-right: 5px;
        }

        .mainInput { 
          display: flex;
        }

        .inputField { 
          flex-grow: 1;
          border: var(--inputField-border, 1px solid black);
          border-radius: var(--inputField-border-radius, 2px);
          padding: var(--inputField-padding, 5px 5px);
        }

        .submitButton { 
          margin-left: 5px;
          border: var(--submitButton-border, 1px solid grey);
          border-radius: var(--submitButton-border-radius, 2px);
          background-color: var(--submitButton-background-color, rgb(221, 221, 221));
          color: var(--submitButton-color, black);
          font-size: var(--submitButton-font-size, 13px);
          width: var(--submitButton-width, auto);
        }

        .submitButton:active { 
          transform: translateY(1px);
        }

        .displayedInputDataField { 
          border-style: var(--displayedInputDataField-border-style, solid);
          border-width: var(--displayedInputDataField-border-width, 1px);
          border-color: var(--displayedInputDataField-border-color, rgb(102, 102, 102));
          background-color: var(--displayedInputDataField-background-color, transparent);
          padding: 5px 5px;
          margin-top: 5px;
        }

        .displayedInputData {  
          color: var(--displayedInputData-color, black);
          font-size: var(--displayedInputData-font-size, 16px);
          text-align: var(--displayedInputData-text-align, left);
        }

        .clearButton { 
          float: right;
          margin-bottom: 5px;
          border: var(--clearButton-border, 1px solid grey);
          border-radius: var(--clearButton-border-radius, 2px);
          background-color: var(--clearButton-background-color, rgb(221, 221, 221));
          color: var(--clearButton-color, black);
          font-size: var(--clearButton-font-size, 13px);
          width: var(--clearButton-width, auto);
        }
      </style>

      <div id="emasPolymerInputField">
        <div class="content">
          <p class="title">[[fieldName]]</p>

          <div class="mainInput"> 
            <input id="inputField" class="inputField" placeholder="[[placeholderText]]" type="search" list="data">

            <template is="dom-if" if="[[ dropdownValues.length ]]">

              <datalist id="data">
                <template is="dom-repeat" items="{{dropdownValues}}">
                  <option value=[[item]]>
                </template>
              </datalist>
            </template>

            <button class="submitButton" on-click="submitData">Submit</button>
          </div>

          <div class=alertDiv>
            <template is="dom-if" if="[[displayDropdownValueRequiredMessage]]">
              <p class="alert">Please choose a value from the dropdown</p>
            </template>

            <template is="dom-if" if="[[maxCharactersBoolean]]">
              <p class="alert">Please submit a value that's maximum [[maxCharacters]] characters long</p>
            </template>
          </div>

          <div class="displayedInputDataField">
            <p class=displayedInputData>[[displayedInputData]]</p>
          </div>  

          <p><button class="clearButton" on-click="clearDisplayedInputdata">Clear text</button></p>
        
        </div>
      </div> 
    `;
  }

  submitData() {
    var inputData = this.shadowRoot.getElementById("inputField").value;

    if (inputData && !this.dropdownValueRequired) {
      if (inputData.length > this.maxCharacters) {
        this.set('maxCharactersBoolean', true);
      } else {
        this.set('displayedInputData', inputData);
        this.shadowRoot.getElementById("inputField").value = "";
        this.set('maxCharactersBoolean', false);
      }
    } else if (inputData && this.dropdownValueRequired) {
      if (this.dropdownValues.includes(inputData)) {
        if (inputData.length > this.maxCharacters) {
          this.set('maxCharactersBoolean', true);
        } else {
          this.set('displayedInputData', inputData);
          this.shadowRoot.getElementById("inputField").value = "";
          this.set('displayDropdownValueRequiredMessage', false);
        }
      } else {
        this.set('displayDropdownValueRequiredMessage', true);
      }
    }
  }

  clearDisplayedInputdata() {
    debugger
    this.set('displayedInputData', "");
  }

}

window.customElements.define('emas-polymer-input-field', EmasPolymerInputField);
