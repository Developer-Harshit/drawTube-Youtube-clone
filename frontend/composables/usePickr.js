import Pickr from '@simonwep/pickr';
export const usePickr = () => {
  function createPickr(eSelect, eParent) {
    const pickr = {
      // Selector or element which will be replaced with the actual color-picker.
      // Can be a HTMLElement.
      el: eSelect,

      // Where the pickr-app should be added as child.
      container: eParent,

      // Which theme you want to use. Can be 'classic', 'monolith' or 'nano'
      theme: 'monolith',

      // Nested scrolling is currently not supported and as this would be really sophisticated to add this
      // it's easier to set this to true which will hide pickr if the user scrolls the area behind it.
      closeOnScroll: false,

      // Custom class which gets added to the pcr-app. Can be used to apply custom styles.
      // appClass: 'custom-class',

      // Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
      // If true, appendToBody will also be automatically true.
      useAsButton: true,

      // Size of gap between pickr (widget) and the corresponding reference (button) in px
      padding: 8,

      // If true pickr won't be floating, and instead will append after the in el resolved element.
      // It's possible to hide it via .hide() anyway.
      inline: false,

      // If true, pickr will be repositioned automatically on page scroll or window resize.
      // Can be set to false to make custom positioning easier.
      autoReposition: true,

      // Defines the direction in which the knobs of hue and opacity can be moved.
      // 'v' => opacity- and hue-slider can both only moved vertically.
      // 'hv' => opacity-slider can be moved horizontally and hue-slider vertically.
      // Can be used to apply custom layouts
      sliders: 'v',

      // Start state. If true 'disabled' will be added to the button's classlist.
      disabled: false,

      // If true, the user won't be able to adjust any opacity.
      // Opacity will be locked at 1 and the opacity slider will be removed.

      lockOpacity: false,

      // Precision of output string (only effective if components.interaction.input is true)
      outputPrecision: 0,

      // Defines change/save behavior:
      // - to keep current color in place until Save is pressed, set to `true`,
      // - to apply color to button and preview (save) in sync with each change
      //   (from picker or palette), set to `false`.
      comparison: true,

      default: '#42445a',

      swatches: null,

      defaultRepresentation: 'HEX',

      showAlways: false,

      // Default is 'Escape'. Can be the event key or code.

      closeWithKey: 'Escape',

      // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
      // Examples: top-start / right-end
      // If clipping occurs, the color picker will automatically choose its position.

      position: 'bottom-middle',

      // Enables the ability to change numbers in an input field with the scroll-wheel.
      // To use it set the cursor on a position where a number is and scroll, use ctrl to make steps of five
      adjustableNumbers: true,

      components: {
        palette: true,
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
          // Buttons, if you disable one but use the format in default: or setColor() - set the representation-type too!
          hex: false, // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
          rgba: false, // Display 'input/output format as rgba' button (red green blue and alpha)
          hsla: false, // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
          hsva: false, // Display 'input/output format as hsva' button (hue saturation value and alpha)

          input: false, // Display input/output textbox which shows the selected color value.
          // the format of the input is determined by defaultRepresentation,
          // and can be changed by the user with the buttons set by hex, rgba, hsla, etc (above).
          cancel: false, // Display Cancel Button, resets the color to the previous state
          clear: false, // Display Clear Button; same as cancel, but keeps the window open
          save: false // Display Save Button,
        }
      }
    };
    return new Pickr(pickr);
  }

  return { createPickr };
};
