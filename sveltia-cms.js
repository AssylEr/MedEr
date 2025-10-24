
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SveltiaCMS = {}));
})(this, (function (exports) { 'use strict';

  const subscriber_queue = [];
  function writable(value, start = () => { }) {
      let stop;
      const subscribers = new Set();
      function set(new_value) {
          if (Object.is(value, new_value)) {
              return;
          }
          value = new_value;
          if (stop) {
              const run_queue = !subscriber_queue.length;
              for (const subscriber of subscribers) {
                  subscriber[1]();
                  subscriber_queue.push(subscriber, value);
              }
              if (run_queue) {
                  for (let i = 0; i < subscriber_queue.length; i += 2) {
                      subscriber_queue[i][0](subscriber_queue[i + 1]);
                  }
                  subscriber_queue.length = 0;
              }
          }
      }
      function update(fn) {
          set(fn(value));
      }
      function subscribe(run, invalidate = () => { }) {
          const subscriber = [run, invalidate];
          subscribers.add(subscriber);
          if (subscribers.size === 1) {
              stop = start(set) || (() => { });
          }
          run(value);
          return () => {
              subscribers.delete(subscriber);
              if (subscribers.size === 0) {
                  stop();
                  stop = null;
              }
          };
      }
      return { set, update, subscribe };
  }

  /**
   * Defines all the widget details.
   */
  const allWidgets = {
      boolean: {
          label: 'Boolean',
          icon: 'toggle-on',
          wysiwyg: false,
          schema: {
              type: 'boolean',
          },
      },
      code: {
          label: 'Code',
          icon: 'code',
          wysiwyg: false,
          schema: {
              type: 'object',
              properties: {
                  lang: {
                      type: 'string',
                  },
                  code: {
                      type: 'string',
                  },
              },
              required: ['lang', 'code'],
          },
      },
      color: {
          label: 'Color',
          icon: 'palette',
          wysiwyg: false,
          schema: {
              type: 'string',
          },
      },
      date: {
          label: 'Date',
          icon: 'calendar',
          wysiwyg: false,
          schema: {
              type: 'string',
              format: 'date-time',
          },
      },
      datetime: {
          label: 'Date & Time',
          icon: 'calendar',
          wysiwyg: false,
          schema: {
              type: 'string',
              format: 'date-time',
          },
      },
      file: {
          label: 'File',
          icon: 'file-upload-outline',
          wysiwyg: true,
          schema: {
              type: 'string',
          },
      },
      hidden: {
          label: 'Hidden',
          icon: 'eye-off',
          wysiwyg: false,
          schema: {
              // The value can be any of string, number, boolean
              oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
          },
      },
      i18n: {
          label: 'i18n',
          icon: 'translate',
          wysiwyg: false,
          schema: {},
      },
      image: {
          label: 'Image',
          icon: 'image-outline',
          wysiwyg: true,
          schema: {
              type: 'string',
          },
      },
      list: {
          label: 'List',
          icon: 'format-list-bulleted',
          wysiwyg: false,
          schema: {
              type: 'array',
              items: {
                  type: 'object',
              },
          },
      },
      map: {
          label: 'Map',
          icon: 'map-marker',
          wysiwyg: false,
          schema: {
              type: 'string',
          },
      },
      markdown: {
          label: 'Markdown',
          icon: 'markdown-outline',
          wysiwyg: true,
          schema: {
              type: 'string',
          },
      },
      number: {
          label: 'Number',
          icon: 'numeric',
          wysiwyg: false,
          schema: {
              type: 'number',
          },
      },
      object: {
          label: 'Object',
          icon: 'code-json',
          wysiwyg: false,
          schema: {
              type: 'object',
          },
      },
      relation: {
          label: 'Relation',
          icon: 'link',
          wysiwyg: false,
          schema: {
              // Can be a string or an array of strings
              oneOf: [
                  {
                      type: 'string',
                  },
                  {
                      type: 'array',
                      items: {
                          type: 'string',
                      },
                  },
              ],
          },
      },
      select: {
          label: 'Select',
          icon: 'form-dropdown',
          wysiwyg: false,
          schema: {
              // Can be a string or an array of strings
              oneOf: [
                  {
                      type: 'string',
                  },
                  {
                      type: 'array',
                      items: {
                          type: 'string',
                      },
                  },
              ],
          },
      },
      string: {
          label: 'String',
          icon: 'format-letter-case',
          wysiwyg: false,
          schema: {
              type: 'string',
          },
      },
      text: {
          label: 'Text',
          icon: 'format-text',
          wysiwyg: false,
          schema: {
              type: 'string',
          },
      },
      unknown: {
          label: 'Unknown',
          icon: 'help-circle-outline',
          wysiwyg: false,
          schema: {},
      },
  };
  const getWidget = (name) => {
      // @ts-ignore
      const { [name]: widget } = allWidgets;
      return widget || allWidgets.unknown;
  };

  /**
   * Svelte component for a variety of SVG icons.
   */
  class Icon extends HTMLElement {
      constructor() {
          super();
          const shadow = this.attachShadow({ mode: 'open' });
          const name = this.getAttribute('name') ?? 'help-circle-outline';
          const { [name]: paths } = {
              'arrow-collapse-all': 'M19.5,3.09L15.41,7.17L12,3.76L8.59,7.17L4.5,3.09L3.09,4.5L7.17,8.59L3.76,12L7.17,15.41L3.09,19.5L4.5,20.91L8.59,16.83L12,20.24L15.41,16.83L19.5,20.91L20.91,19.5L16.83,15.41L20.24,12L16.83,8.59L20.91,4.5L19.5,3.09M12,13.17L13.17,12L12,10.83L10.83,12L12,13.17Z',
              'arrow-down': 'M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z',
              'arrow-expand-all': 'M10.83,12L12,10.83L13.17,12L12,13.17L10.83,12M3.09,4.5L4.5,3.09L8.59,7.17L12,3.76L15.41,7.17L19.5,3.09L20.91,4.5L16.83,8.59L20.24,12L16.83,15.41L20.91,19.5L19.5,20.91L15.41,16.83L12,20.24L8.59,16.83L4.5,20.91L3.09,19.5L7.17,15.41L3.76,12L7.17,8.59L3.09,4.5Z',
              'arrow-left': 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
              'arrow-right': 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
              'arrow-up': 'M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z',
              'auto-fix': 'M22.5,13.25L20.75,15L22.5,16.75L20.5,18L18.75,16.25L17,18L15,16.75L16.75,15L15,13.25L17,12L18.75,13.75L20.5,12M19.5,9.5L18.7,7.16L16.5,6.5L18.7,5.84L19.5,3.5L20.3,5.84L22.5,6.5L20.3,7.16M13.5,5.5L12.7,3.16L10.5,2.5L12.7,1.84L13.5,0L14.3,1.84L16.5,2.5L14.3,3.16M5.1,19H2.6C2.2,19 2,18.8 2,18.4V15.9C2,15.5 2.2,15.3 2.6,15.3H5.1C5.5,15.3 5.7,15.5 5.7,15.9V18.4C5.7,18.8 5.5,19 5.1,19M3.8,17.7H4.5V16.6H3.8V17.7M9.5,19H7C6.6,19 6.4,18.8 6.4,18.4V15.9C6.4,15.5 6.6,15.3 7,15.3H9.5C9.9,15.3 10.1,15.5 10.1,15.9V18.4C10.1,18.8 9.9,19 9.5,19M8.2,17.7H8.9V16.6H8.2V17.7Z',
              backup: 'M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M12.5,11H10.5L10.5,15H8L11.5,18.5L15,15H12.5V11Z',
              bell: 'M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29V4A2,2 0 0,1 12,2A2,2 0 0,1 14,4V4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11C17,8.24 14.76,6 12,6S7,8.24 7,11V18H17V11Z',
              'book-open-outline': 'M13,22L3,17.27V5.09L13,9.82V22M14,9.82L24,5.09V17.27L14,22V9.82M14.5,19.56L21,16.14V6.91L14.5,10.33V19.56M12.5,19.56V10.33L6,6.91V16.14L12.5,19.56M22.5,4L12.5,8.15L2.5,4L12.5,0L22.5,4Z',
              calendar: 'M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M16.53,11.06L15.47,10L10.5,15L8.47,12.97L7.41,14.03L10.5,17.12L16.53,11.06Z',
              'check-circle': 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z',
              'chevron-down': 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
              'chevron-right': 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
      
              close: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
              'cloud-upload': 'M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z',
              code: 'M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z',
              'code-json': 'M6,13H11V15H6V13M13,13H18V15H13V13M9,9H15V11H9V9M2,4V6H22V4M2,20H22V18H2V20Z',
              cog: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
              content: 'M15,5H19V3H15V5M15,9H19V7H15V9M15,13H19V11H15V13M5,21H19V14H5V21M3,3H13V13H3V3Z',
              delete: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
              drag: 'M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16Z',
              'eye-off': 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.95,9 11.89,9 11.83,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.83 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.4,4.84L1.12,2.56L0,3.68L2.09,5.77C1.42,6.68 0.81,7.72 0.33,8.81L0,9L2.2,11.2C2.03,11.5 1.88,11.79 1.75,12C3.83,17.5 8.71,19.5 12,19.5C12.5,19.5 13,19.45 13.5,19.35L14.73,20.58L15.85,19.46L4.52,6L3.4,4.84M7.92,9.68L6.47,8.23C5.5,9.04 4.71,10.1 4.11,11.23L4.35,11.47C4.53,11.78 4.73,12.08 4.96,12.38L6.37,11C6.71,10.64 7.09,10.33 7.5,10.08L7.92,9.68M9.08,12.43L8.3,13.22C8.2,12.83 8.08,12.45 8.08,12.05L8.09,11.81L9.08,12.43M12,14.5C11.2,14.5 10.4,14.29 9.77,13.84L13.18,17.25C12.79,17.39 12.4,17.5 12,17.5C8.75,17.5 6.13,16.2 4.19,13.82L4.05,13.65L4.4,13.31C5.16,12.55 5.82,11.73 6.37,10.86L6.1,10.58L9.82,14.3L9.58,14.54L9.5,14.45C10.25,14.5 11.1,14.5 12,14.5Z',
              'file-document-outline': 'M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z',
              'file-upload-outline': 'M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z',
              'format-letter-case': 'M19,20H5V18H19V20M13,4L15,10H11L13,4M5,10H9L7,4H5M17,4L19,10H15L17,4M5,16H19V14H5V16Z',
              'format-list-bulleted': 'M7,5H21V7H7V5M7,13V11H21V13H7M7,19V17H21V19H7M4,6A1,1 0 0,1 3,5A1,1 0 0,1 4,4A1,1 0 0,1 5,5A1,1 0 0,1 4,6M4,12A1,1 0 0,1 3,11A1,1 0 0,1 4,10A1,1 0 0,1 5,11A1,1 0 0,1 4,12M4,18A1,1 0 0,1 3,17A1,1 0 0,1 4,16A1,1 0 0,1 5,17A1,1 0 0,1 4,18Z',
              'format-text': 'M18.5,4L19.66,8.34L18.5,12.67H17.33L16.17,8.34L15,4H17.5L18.5,7.5L19.5,4H22L20.84,8.34L22,12.67H19.66L18.5,8.34L17.33,12.67H15L16.17,8.34L15,4M2.5,4H12.5V6H7.5V12.67H10.5V14.67H7.5V17H12.5V19H2.5V17H5.5V14.67H2.5V12.67H5.5V6H2.5V4Z',
              'folder-open-outline': 'M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z',
              github: 'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.73C9.63,17.1 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
              gitlab: 'M2,12L7.6,2.37L10.8,8.7L13.2,8.7L16.4,2.37L22,12L16.4,21.63L13.2,15.3L10.8,15.3L7.6,21.63L2,12Z',
              'help-circle-outline': 'M10.8,15.3H13.2V12.9H10.8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,8.1 19.8,4.8 16.7,3.1C16.3,2.8 15.8,2.5 15.4,2.3C15,2.1 14.5,2 14,2A2,2 0 0,0 12,4A2,2 0 0,0 14,6C15.9,6 17.8,6.9 19,8.3C20.3,9.8 21,11.3 21,13.3C21,14.5 20.6,15.6 19.7,16.5L18.6,17.6C17.5,18.7 16.8,19.3 16.4,19.7C16,20.1 15.6,20.3 15.3,20.5C15,20.7 14.5,21 14,21A2,2 0 0,1 12,19A2,2 0 0,1 14,17C14.8,17 15.5,16.6 16.2,15.9L17.3,14.8C18.1,14 18.3,13.4 18.3,13.2C18.3,12.2 17.8,11.3 16.7,10.2C15.6,9.1 14,8.5 12,8.5C10.8,8.5 9.7,9 8.8,9.8C8,10.7 7.5,11.8 7.5,13.1H9.9C9.9,12.3 10.2,11.7 10.8,11.1C11.3,10.6 11.6,10.3 12,10.3C12.4,10.3 12.7,10.4 13,10.6C13.3,10.9 13.4,11.2 13.4,11.5C13.4,11.9 13.3,12.2 13,12.4C12.7,12.6 12.4,12.7 12,12.7C11.6,12.7 11.3,12.6 11,12.4C10.7,12.2 10.6,11.9 10.6,11.5H8.2C8.2,12.4 8.6,13.2 9.2,13.8C9.9,14.5 10.8,14.7 11.4,14.9V15.3H10.8',
              home: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z',
              'image-outline': 'M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z',
              'information-outline': 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z',
              link: 'M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83L5.17,10.83C4.78,10.44 4.78,9.81 5.17,9.41C5.56,9 6.2,9 6.59,9.41L10.59,13.41M13.41,10.59L17.41,6.59C17.8,6.2 18.44,6.2 18.83,6.59C19.22,6.98 19.22,7.62 18.83,8L14.83,12C14.44,12.39 13.81,12.39 13.41,12C13,11.61 13,11 13.41,10.59M19.83,5.17C19.24,4.58 18.26,4.58 17.67,5.17L14.17,8.67C13.97,8.87 13.97,9.19 14.17,9.39L14.61,9.83C14.81,10.03 15.13,10.03 15.33,9.83L18.83,6.33C19.03,6.13 19.34,6.13 19.54,6.33L19.83,6.62C20.03,6.82 20.03,7.14 19.83,7.34L16.33,10.84C16.13,11.04 16.13,11.35 16.33,11.55L16.78,12C16.98,12.19 17.29,12.19 17.49,12L20.83,8.67C21.42,8.08 21.42,7.1 20.83,6.52L19.83,5.17M4.17,11.17C4.17,11.17 4.17,11.17 4.17,11.17C3.58,10.58 3.58,9.6 4.17,9L7.67,5.5C7.87,5.3 8.19,5.3 8.39,5.5L8.83,5.94C9.03,6.14 9.03,6.46 8.83,6.66L5.33,10.16C5.13,10.36 4.82,10.36 4.62,10.16L4.17,9.71C3.97,9.51 3.97,9.19 4.17,8.99L7.52,5.65C7.72,5.45 7.72,5.13 7.52,4.93L6.52,3.93C5.93,3.34 4.95,3.34 4.36,3.93L3.17,5.12L4.17,11.17Z',
              lock: 'M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3Z',
              login: 'M10,17.25V14.25H12V17.25H10M16,20V4H8V7H4V20H16M6,9H14V11H6V9M6,12H14V14H6V12M6,15H8V18H6V15M10,18V15H12V18H10M14,18V15H16V18H14Z',
              logout: 'M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2Z',
              'magnify-plus': 'M9.5,4A5.5,5.5 0 0,1 15,9.5C15,10.97 14.54,12.33 13.79,13.42L18,17.64L16.64,19L12.42,14.79C11.33,15.54 9.97,16 8.5,16A6.5,6.5 0 0,1 2,9.5A6.5,6.5 0 0,1 8.5,3C9,3 9.5,3.06 10,3.17V1H7V-1H10V1C10.5,1.06 11,1 11.5,1C12.33,1 13.09,1.25 13.74,1.66L15,0.41L16.41,1.82L15.16,3.07C15.75,3.9 16,4.92 16,6H18V9H16C16,10.08 15.75,11.1 15.16,11.93L16.41,13.18L15,14.59L13.74,13.34C13.09,13.75 12.33,14 11.5,14H9.5V16H6.5V14H4.5C3.42,14 2.4,13.75 1.57,13.16L0.32,14.41L-1.09,13L0.16,11.74C-0.25,11.09 -0.5,10.33 -0.5,9.5C-0.5,8.67 -0.25,7.91 0.16,7.26L-1.09,6L0.32,4.59L1.57,5.84C2.4,5.25 3.42,5 4.5,5H6.5V3H9.5V4M9.5,6A3.5,3.5 0 0,0 6,9.5A3.5,3.5 0 0,0 9.5,13A3.5,3.5 0 0,0 13,9.5A3.5,3.5 0 0,0 9.5,6M11,8V9H12V10H11V11H10V10H9V9H10V8H11Z',
              'map-marker': 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
              'markdown-outline': 'M20.56,18H3.44C3.2,18 3,17.8 3,17.56V6.44C3,6.2 3.2,6 3.44,6H20.56C20.8,6 21,6.2 21,6.44V17.56C21,17.8 20.8,18 20.56,18M5,16H19V8H5V16M13,9H16L12,13L8,9H11V10.5H9.5V12H14.5V10.5H13V9Z',
              'menu-down': 'M7,10L12,15L17,10H7Z',
              'menu-up': 'M7,15L12,10L17,15H7Z',
              moon: 'M12,2A9.91,9.91 0 0,0 9,2.46A10,10 0 0,1 9,18A10,10 0 0,1 21.54,15A10,10 0 0,0 12,2Z',
      
              numeric: 'M4,17V9H6V17H4M10,17V9H12V17H10M16,17V9H18V17H16Z',
              'open-in-new': 'M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z',
              palette: 'M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.08 13.15,18.73 12.76,18.7C10.74,18.44 9.1,16.74 9.1,14.7V14.5C9.1,14.12 9.42,13.8 9.8,13.8H14.2C14.58,13.8 14.9,14.12 14.9,14.5V14.7C14.9,16.74 13.26,18.44 11.24,18.7C10.85,18.73 10.5,19.08 10.5,19.5A1.5,1.5 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z',
              'pencil-outline': 'M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z',
              plus: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
              'publish-auto': 'M17,13L22.25,18L17,23V19H4V16H17V13M7,11L1.75,6L7,1V5H20V8H7V11Z',
              publish: 'M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z',
              'redo-variant': 'M10.5,1C6.36,1 2.95,3.94 2.16,8H4.22C4.94,5.16 7.47,3 10.5,3C13.85,3 16.64,5.43 17,8.73L15,10.73V3H17V11.25L22.25,16.5L17,21.75V14H15V16.27C14.58,18.71 12.71,20.58 10.27,21C7.43,21.5 4.5,19.56 4,16.73L2,14.73V22H4V20.27C4.64,23.57 7.7,26 11.23,26C15.36,26 18.77,23.06 19.56,19H17.5C16.78,21.84 14.25,24 11.23,24C8.16,24 5.5,21.56 5,18.73L7,16.73V24H9V16H10.5C14.64,16 18,12.64 18,8.5C18,4.36 14.64,1 10.5,1Z',
              'reload-alert': 'M10.83,16L12,17.17L13.17,16L12,14.83L10.83,16M3.09,19.5L4.5,20.91L8.59,16.83L12,20.24L15.41,16.83L19.5,20.91L20.91,19.5L16.83,15.41L20.24,12L16.83,8.59L20.91,4.5L19.5,3.09L15.41,7.17L12,3.76L8.59,7.17L4.5,3.09L3.09,4.5L7.17,8.59L3.76,12L7.17,15.41L3.09,19.5Z',
              save: 'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
              'sort-ascending': 'M19,17H22L18,21L14,17H17V3H19M2,17H12V19H2M6,5V7H12V5M2,11H9V13H2V11Z',
              'sort-descending': 'M19,7H22L18,3L14,7H17V21H19M2,17H12V19H2M6,5V7H12V5M2,11H9V13H2V11Z',
              'stop-circle-outline': 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M9,9H15V15H9V9Z',
              sun: 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,4L14.5,6.5L12,9L9.5,6.5L12,4M6.5,9.5L4,12L6.5,14.5L9,12L6.5,9.5M12,15L9.5,17.5L12,20L14.5,17.5L12,15M17.5,9.5L15,12L17.5,14.5L20,12L17.5,9.5M4,11H1V13H4V11M20,11H23V13H20V11M11,1V4H13V1H11M11,20V23H13V20H11Z',
              'toggle-on': 'M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z',
              translate: 'M12.87,15.07L10.33,12.54L10.36,12.5L15.32,7.53C15.71,7.14 15.71,6.5 15.32,6.11L14.09,4.88C13.7,4.5 13.06,4.5 12.68,4.88L7.72,9.84L7.75,9.87L5.22,12.4L2.83,14.79C2.44,15.18 2.44,15.82 2.83,16.21L4.06,17.44C4.45,17.83 5.09,17.83 5.47,17.44L12.87,15.07M18.59,10.68L18.25,11.02L16.14,8.91L16.48,8.57C16.87,8.18 17.5,8.18 17.89,8.57L19.12,9.79C19.5,10.18 19.5,10.82 19.12,11.21L18.59,10.68Z',
              'tune-variant': 'M6,21V13H4V11H6V3H8V11H10V13H8V21H6M12,21V16H14V14H12V3H16V5H18V3H20V5H22V7H20V9H18V7H16V14H18V16H16V21H14V16H12Z',
              'undo-variant': 'M12.5,8C9.91,8 7.62,9.23 6.1,11.22L3.5,8.62V15.12H10L7.38,12.5C8.61,10.88 10.42,10 12.5,10C15.19,10 17.5,11.93 18.23,14.5H20.25C19.44,10.77 16.27,8 12.5,8Z',
      
              'unpublish-auto': 'M17,13L22.25,18L17,23V19H4V16H17V13M7,11L1.75,6L7,1V5H20V8H7V11Z',
              'upload-network-outline': 'M12.5,10H16V14H12.5M19.7,9.1L18,8.4V4.7C18,4.2 17.8,3.8 17.4,3.5C17,3.2 16.6,3 16.1,3H7.9C7.4,3 7,3.2 6.6,3.5C6.2,3.8 6,4.2 6,4.7V8.4L4.3,9.1C3.8,9.3 3.4,9.6 3.2,10.1C3,10.6 3,11.1 3.2,11.6L5.5,16.5C5.7,17 6,17.4 6.5,17.7C7,17.9 7.5,18 8.1,18H15.9C16.5,18 17,17.9 17.5,17.7C18,17.4 18.3,17 18.5,16.5L20.8,11.6C21,11.1 21,10.6 20.8,10.1C20.6,9.6 20.2,9.3 19.7,9.1M17,15.8L15.2,11.2C15.1,11 14.9,10.8 14.7,10.7C14.5,10.6 14.3,10.5 14,10.5H10C9.7,10.5 9.5,10.6 9.3,10.7C9.1,10.8 8.9,11 8.8,11.2L7,15.8V9H17V15.8M15,5H9V7H15V5Z',
              user: 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z',
              'view-grid-plus-outline': 'M19,19H5V5H19M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M10,10H5V12H10V10M10,14H5V16H10V14M16,10H14V12H16V10M16,14H14V16H16V14M12,10V12H14V10H12M12,14V16H14V14H12M14,5H16V7H14V5M14,8H16V10H14V8M10,5V7H12V5H10M10,8V10H12V8H10M8,5H10V7H8V5M8,8H10V10H8V8Z',
              'view-grid-outline': 'M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3',
          };
          shadow.innerHTML = `
        <style>
          :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          svg {
            width: 1.2rem;
            height: 1.2rem;
            fill: currentColor;
          }
        </style>
        <svg viewBox="0 0 24 24">
          <path d="${paths}" />
        </svg>
      `;
      }
  }
  if (!window.customElements.get('sveltia-icon')) {
      window.customElements.define('sveltia-icon', Icon);
  }

  const en = {
      app: {
          error: 'An unexpected error occurred. Please check the browser console for details.',
          'error-in-dev-mode': 'An error occurred. Press F12 and check the browser console for details.',
      },
      common: {
          'add-item': 'Add {{name}}',
          'add-new': 'Add New',
          'all-items': 'All {{name}}',
          'cancel-editing': 'Cancel Editing',
          'cancel-selection': 'Cancel Selection',
          close: 'Close',
          confirm: 'Confirm',
          create: 'Create',
          'create-new': 'Create New',
          'create-new-item': 'Create New {{name}}',
          'delete-item': 'Delete {{name}}',
          'delete-items': 'Delete {{count}} {{name}}',
          'delete-selected': 'Delete Selected',
          'edit-item': 'Edit {{name}}',
          files: 'Files',
          'filter-by': 'Filter by…',
          'go-back': 'Go Back',
          'group-by': 'Group by…',
          grouping: 'Grouping',
          'item-not-found': '{{name}} not found.',
          'keep-editing': 'Keep Editing',
      },
  };

  /**
   * Type definitions for `lit-translate`.
   */
  const locale = writable('en');
  const dictionaries = writable({ en });
  /**
   * Get the current locale.
   * @returns {string} Current locale.
   */
  function getLocale() {
      let _locale;
      locale.subscribe((value) => {
          _locale = value;
      });
      // @ts-ignore
      return _locale;
  }
  function add(...args) {
      let _dictionaries;
      dictionaries.subscribe((value) => {
          _dictionaries = value;
      });
      args.forEach(({ name, dictionary }) => {
          if (name && dictionary) {
              // @ts-ignore
              _dictionaries[name] = dictionary;
          }
      });
      dictionaries.set(_dictionaries);
  }

  /**
   * Create a new `SvelteiaCMS` instance.
   * @param {object} config System configuration.
   */
  class SveltiaCMS {
      constructor(config) {
          this.config = config;
      }
  }

  /**
   * Svelte component for a translucent backdrop, used by `Modal` and `Drawer`.
   */
  class Backdrop extends HTMLElement {
      constructor() {
          super();
          const shadow = this.attachShadow({ mode: 'open' });
          shadow.innerHTML = `
        <style>
          :host {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 100;
          }
        </style>
      `;
          this.addEventListener('click', () => {
              this.dispatchEvent(new Event('close', { bubbles: true }));
          });
      }
  }
  if (!window.customElements.get('sveltia-backdrop')) {
      window.customElements.define('sveltia-backdrop', Backdrop);
  }

  /**
   * Svelte component to display a dialog.
   */
  class Modal extends HTMLElement {
      /**
       * Get the component’s internally-used context.
       * @type {object}
       */
      get context() {
          const title = this.getAttribute('title');
          return {
              title: title ? title.trim() : null,
          };
      }
      constructor() {
          super();
          const { title } = this.context;
          const shadow = this.attachShadow({ mode: 'open' });
          shadow.innerHTML = `
        <style>
          :host {
            position: fixed;
            inset: 0;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 101;
          }
          .panel {
            min-width: 320px;
            max-width: 560px;
            min-height: 180px;
            max-height: 90vh;
            background-color: var(--sui-dialog-background, #fff);
            border-radius: 6px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          header {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          h2 {
            margin: 0;
            font-size: 1.25rem;
          }
          .close {
            background: none;
            border: none;
            padding: 0.25rem;
            margin: -0.25rem;
            cursor: pointer;
            color: inherit;
          }
          .body {
            padding: 1rem;
            overflow-y: auto;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          footer {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        </style>
        <sveltia-backdrop></sveltia-backdrop>
        <div class="panel" role="dialog" part="panel">
          <header part="header">
            <h2 part="title">${title || ''}</h2>
            <button class="close" part="close-button" title="${'Close'}">
              <sveltia-icon name="close"></sveltia-icon>
            </button>
          </header>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <footer part="footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      `;
          const closeButton = shadow.querySelector('button.close');
          closeButton?.addEventListener('click', () => {
              this.dispatchEvent(new Event('close', { bubbles: true }));
          });
          shadow.querySelector('sveltia-backdrop')?.addEventListener('close', () => {
              this.dispatchEvent(new Event('close', { bubbles: true }));
          });
      }
  }
  if (!window.customElements.get('sveltia-modal')) {
      window.customElements.define('sveltia-modal', Modal);
  }

  /**
   * Initialize a Svelte app.
   * @param {object} args Arguments.
   * @param {string} args.componentName Component file name.
   * @param {string} args.targetSelector Target element selector.
   * @param {object} args.props Component properties.
   * @todo Import Svelte components dynamically.
   */
  const initSvelte = async ({ componentName, targetSelector, props, }) => {
      new Modal({
          target: document.querySelector(targetSelector),
          props,
      });
  };

  /**
   * Show a modal dialog.
   * @param {object} options - Options.
   * @param {string} options.title - Dialog title.
   * @param {string} options.message - Dialog message.
   * @param {string} [options.level] - Alert level: `info`, `success`, `warning` or `error`.
   * @param {string} [options.confirmText] - Text for the confirm button.
   * @param {Function} [options.onConfirm] - Cllback for when the confirm button is clicked.
   * @param {string} [options.cancelText] - Text for the cancel button.
   * @param {Function} [options.onCancel] - Cllback for when the cancel button is clicked.
   */
  const showModal = ({ title, message, level = 'info', confirmText, onConfirm, cancelText, onCancel, }) => {
      initSvelte({
          componentName: 'Alert',
          targetSelector: 'body',
          props: {
              title,
              message,
              level,
              confirmText,
              onConfirm,
              cancelText,
              onCancel,
          },
      });
  };

  /**
   * Displays an alert, and returns a promise that resolves when the user dismisses it.
   * @param {string | { title: string, message: string }} details - Dialog title, or an object containing
   * `title` and `message`.
   * @param {'info' | 'success' | 'warning' | 'error'} [level='info'] - Alert level.
   * @returns {Promise<void>} Resolves when the user clicks the OK button.
   */
  const alert = (details, level = 'info') => new Promise((resolve) => {
      const { title, message } = typeof details === 'string' ? { title: details, message: '' } : details;
      showModal({
          title,
          message,
          level,
          confirmText: 'OK',
          onConfirm: resolve,
      });
  });

  /**
   * Displays a confirmation dialog, and returns a promise that resolves when the user confirms or
   * cancels it.
   * @param {string | { title: string, message: string }} details - Dialog title, or an object containing
   * `title` and `message`.
   * @param {'info' | 'success' | 'warning' | 'error'} [level='info'] - Alert level.
   * @returns {Promise<boolean>} Resolves with `true` if the user confirms, `false` otherwise.
   */
  const confirm = (details, level = 'info') => new Promise((resolve) => {
      const { title, message } = typeof details === 'string' ? { title: details, message: '' } : details;
      showModal({
          title,
          message,
          level,
          confirmText: 'OK',
          onConfirm: () => {
              resolve(true);
          },
          cancelText: 'Cancel',
          onCancel: () => {
              resolve(false);
          },
      });
  });

  /**
   * Base class for all the backend services.
   */
  class Backend {
      constructor(config) {
          this.config = config;
      }
      /**
       * Get the backend name.
       * @returns {string} Name.
       */
      get name() {
          return this.config.backend.name;
      }
      /**
       * Get the authentication token.
       * @returns {Promise<string | null>} Token.
       */
      getToken() {
          throw new Error('Not implemented');
      }
      /**
       * Log in with the backend service.
       * @param {object} options - Options.
       * @returns {Promise<object>} User info.
       */
      login(options) {
          throw new Error('Not implemented');
      }
      /**
       * Log out from the backend service.
       * @returns {Promise<void>}
       */
      logout() {
          throw new Error('Not implemented');
      }
      /**
       * Restore the login status.
       * @returns {Promise<object>} User info.
       */
      restore() {
          throw new Error('Not implemented');
      }
      /**
       * Handle the implicit OAuth flow. This is called from the auth-callback page.
       * @returns {Promise<void>}
       */
      handleAuth() {
          throw new Error('Not implemented');
      }
      /**
       * Check if the user is already authenticated.
       * @returns {Promise<boolean>} `true` if the user is authenticated.
       */
      async isAuthenticated() {
          return !!(await this.getToken());
      }
  }

  /**
   * Implements the Implicit Grant OAuth flow.
   */
  class ImplicitGrant extends Backend {
      /**
       * Create a new backend instance.
       * @param {object} config - Backend configuration.
       * @param {object} options - Backend options.
       * @param {string} options.authURL - OAuth 2.0 authorization endpoint.
       * @param {string} options.appID - Application ID.
       * @param {string} [options.authScope] - Requested scopes.
       */
      constructor(config, { authURL, appID, authScope = '' }) {
          super(config);
          this.authURL = authURL;
          this.appID = appID;
          this.authScope = authScope;
      }
      /**
       * Get the authentication token.
       * @returns {Promise<string | null>} Token.
       */
      async getToken() {
          const { token = null, expires = 0 } = JSON.parse(localStorage.getItem(`sveltia-cms.${this.name}.auth`) ?? '{}');
          if (token && expires > Date.now()) {
              return token;
          }
          return null;
      }
      /**
       * Log in with the backend service.
       * @param {object} [options] - Options.
       * @returns {Promise<any>} User info.
       * @see https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
       */
      async login(options) {
          const state = String(Math.random());
          const { origin, pathname } = window.location;
          // URL for the authentication callback page. It will be something like
          // `https://<domain>/<path>/auth-callback`. We cannot use a static file name like `callback`
          // or `auth-callback`, as it can easily conflict with other files.
          const callbackURL = new URL('auth-callback', `${origin}${pathname}`).href;
          const params = new URLSearchParams({
              client_id: this.appID,
              redirect_uri: callbackURL,
              scope: this.authScope,
              state,
          });
          sessionStorage.setItem(`sveltia-cms.${this.name}.state`, state);
          window.location.assign(`${this.authURL}?${params}`);
          return {};
      }
      /**
       * Log out from the backend service.
       * @returns {Promise<void>}
       */
      async logout() {
          localStorage.removeItem(`sveltia-cms.${this.name}.auth`);
      }
      /**
       * Restore the login status.
       * @returns {Promise<any>} User info.
       */
      async restore() {
          const token = await this.getToken();
          if (token) {
              return {};
          }
          throw new Error('Not authenticated');
      }
      /**
       * Handle the implicit OAuth flow. This is called from the auth-callback page.
       * @returns {Promise<void>}
       */
      async handleAuth() {
          const { hash, search } = window.location;
          const params = new URLSearchParams(hash.slice(1) || search.slice(1));
          const accessToken = params.get('access_token');
          const state = params.get('state');
          const savedState = sessionStorage.getItem(`sveltia-cms.${this.name}.state`);
          sessionStorage.removeItem(`sveltia-cms.${this.name}.state`);
          if (!accessToken || !state || state !== savedState) {
              return;
          }
          const { origin, pathname } = window.location;
          // Remove the search query and hash
          const newURL = `${origin}${pathname.replace(/\/auth-callback$/, '/')}`;
          // Set the cookie if `token_type` is `bearer` which is the case for GitHub/GitLab
          if (params.get('token_type') === 'bearer') {
              const expires = Number(params.get('expires_in')) * 1000 + Date.now();
              localStorage.setItem(`sveltia-cms.${this.name}.auth`, JSON.stringify({ token: accessToken, expires }));
          }
          window.location.assign(newURL);
      }
  }

  /**
   * Implements the PKCE (Proof Key for Code Exchange) OAuth flow.
   * @see https://www.oauth.com/oauth2-servers/pkce/
   */
  class PKCE extends Backend {
      /**
       * Create a new backend instance.
       * @param {object} config - Backend configuration.
       * @param {object} options - Backend options.
       * @param {string} options.authURL - OAuth 2.0 authorization endpoint.
       * @param {string} options.tokenURL - OAuth 2.0 token endpoint.
       * @param {string} options.appID - Application ID.
       * @param {string} [options.authScope] - Requested scopes.
       */
      constructor(config, { authURL, tokenURL, appID, authScope = '' }) {
          super(config);
          this.authURL = authURL;
          this.tokenURL = tokenURL;
          this.appID = appID;
          this.authScope = authScope;
      }
      /**
       * Get the authentication token.
       * @returns {Promise<string | null>} Token.
       */
      async getToken() {
          const { token = null, expires = 0 } = JSON.parse(localStorage.getItem(`sveltia-cms.${this.name}.auth`) ?? '{}');
          if (token && expires > Date.now()) {
              return token;
          }
          return null;
      }
      /**
       * Log in with the backend service.
       * @param {object} [options] - Options.
       * @returns {Promise<any>} User info.
       * @see https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
       */
      async login(options) {
          const state = String(Math.random());
          const { origin, pathname } = window.location;
          // URL for the authentication callback page. It will be something like
          // `https://<domain>/<path>/auth-callback`. We cannot use a static file name like `callback`
          // or `auth-callback`, as it can easily conflict with other files.
          const callbackURL = new URL('auth-callback', `${origin}${pathname}`).href;
          const codeVerifier = this.createCodeVerifier();
          const codeChallenge = await this.createCodeChallenge(codeVerifier);
          const params = new URLSearchParams({
              client_id: this.appID,
              redirect_uri: callbackURL,
              response_type: 'code',
              scope: this.authScope,
              state,
              code_challenge: codeChallenge,
              code_challenge_method: 'S256',
          });
          sessionStorage.setItem(`sveltia-cms.${this.name}.state`, state);
          sessionStorage.setItem(`sveltia-cms.${this.name}.pkce`, codeVerifier);
          window.location.assign(`${this.authURL}?${params}`);
          return {};
      }
      /**
       * Log out from the backend service.
       * @returns {Promise<void>}
       */
      async logout() {
          localStorage.removeItem(`sveltia-cms.${this.name}.auth`);
      }
      /**
       * Restore the login status.
       * @returns {Promise<any>} User info.
       */
      async restore() {
          const token = await this.getToken();
          if (token) {
              return {};
          }
          throw new Error('Not authenticated');
      }
      /**
       * Handle the implicit OAuth flow. This is called from the auth-callback page.
       * @returns {Promise<void>}
       */
      async handleAuth() {
          const params = new URLSearchParams(window.location.search);
          const code = params.get('code');
          const state = params.get('state');
          const savedState = sessionStorage.getItem(`sveltia-cms.${this.name}.state`);
          const codeVerifier = sessionStorage.getItem(`sveltia-cms.${this.name}.pkce`);
          sessionStorage.removeItem(`sveltia-cms.${this.name}.state`);
          sessionStorage.removeItem(`sveltia-cms.${this.name}.pkce`);
          if (!code || !state || state !== savedState || !codeVerifier) {
              return;
          }
          const { origin, pathname } = window.location;
          const callbackURL = new URL('auth-callback', `${origin}${pathname}`).href;
          const tokenResponse = await fetch(this.tokenURL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  client_id: this.appID,
                  grant_type: 'authorization_code',
                  redirect_uri: callbackURL,
                  code_verifier: codeVerifier,
                  code,
              }),
          });
          if (!tokenResponse.ok) {
              throw new Error('Failed to get token');
          }
          const { access_token: accessToken, expires_in: expiresIn } = await tokenResponse.json();
          const expires = expiresIn * 1000 + Date.now();
          localStorage.setItem(`sveltia-cms.${this.name}.auth`, JSON.stringify({ token: accessToken, expires }));
          // Remove the search query
          const newURL = `${origin}${pathname.replace(/\/auth-callback$/, '/')}`;
          window.location.assign(newURL);
      }
      /**
       * Create a code verifier for the PKCE flow.
       * @returns {string} Verifier.
       * @see https://www.oauth.com/oauth2-servers/pkce/authorization-request/
       */
      createCodeVerifier() {
          const S4 = () => Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
      }
      /**
       * Create a code challenge for the PKCE flow.
       * @param {string} codeVerifier - Code verifier.
       * @returns {Promise<string>} Challenge.
       */
      async createCodeChallenge(codeVerifier) {
          const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
          return window
              .btoa(String.fromCharCode(...new Uint8Array(digest)))
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=/g, '');
      }
  }

  /**
   * Use the GitHub backend.
   * @see https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
   */
  class GitHub extends Backend {
      /**
       * Create a new backend instance.
       * @param {object} config - Backend configuration.
       */
      constructor(config) {
          const { auth_type: authType = 'implicit', app_id: appID } = config.backend;
          const authURL = 'https://github.com/login/oauth/authorize';
          if (authType === 'pkce') {
              super(new PKCE(config, {
                  authURL,
                  tokenURL: 'https://sveltia-cms-github-app.vercel.app/api/token',
                  appID,
                  authScope: 'repo,user',
              }));
          }
          else {
              super(new ImplicitGrant(config, {
                  authURL,
                  appID,
                  authScope: 'repo,user',
              }));
          }
      }
      /**
       * Get the backend name.
       * @returns {string} Name.
       */
      get name() {
          return 'github';
      }
      /**
       * Get the authentication token.
       * @returns {Promise<string | null>} Token.
       */
      getToken() {
          // @ts-ignore
          return this.config.getToken();
      }
      /**
       * Log in with the backend service.
       * @param {object} [options] - Options.
       * @returns {Promise<any>} User info.
       */
      login(options) {
          // @ts-ignore
          return this.config.login(options);
      }
      /**
       * Log out from the backend service.
       * @returns {Promise<void>}
       */
      logout() {
          // @ts-ignore
          return this.config.logout();
      }
      /**
       * Restore the login status.
       * @returns {Promise<any>} User info.
       */
      restore() {
          // @ts-ignore
          return this.config.restore();
      }
      /**
       * Handle the implicit OAuth flow. This is called from the auth-callback page.
       * @returns {Promise<void>}
       */
      handleAuth() {
          // @ts-ignore
          return this.config.handleAuth();
      }
  }

  /**
   * Log an error and show a modal.
   * @param {Error} error - Error to be handled.
   */
  const handleException = (error) => {
      const isDev = false;
      // eslint-disable-next-line no-console
      console.error(error);
      alert({
          title: isDev
              ? getLocale() === 'en'
                  ? en.app['error-in-dev-mode']
                  : 'An error occurred. Press F12 and check the browser console for details.'
              : getLocale() === 'en'
                  ? en.app.error
                  : 'An unexpected error occurred. Please check the browser console for details.',
          message: isDev ? error.message : '',
      }, 'error');
  };

  /**
   * The main class that ties everything together.
   */
  class App {
      /**
       * Create a new App instance.
       * @param {object} config - The full configuration object.
       */
      constructor(config) {
          this.config = config;
          this.backend = new GitHub(config);
          this.cms = new SveltiaCMS(config);
          // Handle uncaught errors
          window.addEventListener('error', (e) => {
              handleException(e.error);
          });
          window.addEventListener('unhandledrejection', (e) => {
              handleException(e.reason);
          });
          // Show a confirmation dialog when the user is about to leave the page with unsaved changes
          window.addEventListener('beforeunload', (e) => {
              // @ts-ignore
              if (this.canLeave) {
                  return undefined;
              }
              e.preventDefault();
              e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
              return e.returnValue;
          });
      }
      /**
       * Authenticate the user with the backend service.
       * @param {object} [options] - Options for the backend’s `login` method.
       * @returns {Promise<any>} User info.
       */
      async login(options) {
          const user = await this.backend.login(options);
          return user;
      }
      /**
       * Log out the user from the backend service.
       */
      async logout() {
          await this.backend.logout();
      }
      /**
       * Restore the login status.
       * @returns {Promise<any>} User info.
       */
      async restore() {
          const user = await this.backend.restore();
          return user;
      }
      /**
       * Handle the implicit OAuth flow. This is called from the auth-callback page.
       * @returns {Promise<void>}
       */
      async handleAuth() {
          await this.backend.handleAuth();
      }
  }

  /**
   * Create the main application that ties all the pieces together.
   * @param {object} args - Arguments.
   * @param {object} args.config - The full configuration object.
   * @returns {App} New `App` instance.
   */
  const createCMS = (args) => new App(args.config);

  const noop = () => { };
  const identity = (x) => x;
  function assign(tar, src) {
      // @ts-ignore
      for (const k in src)
          tar[k] = src[k];
      return tar;
  }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function is_empty(obj) {
      return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
      if (store == null) {
          return noop;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
      component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
      if (definition) {
          const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
          return definition[0](slot_ctx);
      }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
      return definition[1] && fn
          ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
          : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
      if (definition[2] && fn) {
          const lets = definition[2](fn(dirty));
          if ($$scope.dirty === undefined) {
              return lets;
          }
          if (typeof lets === 'object') {
              const merged = [];
              const len = Math.max($$scope.dirty.length, lets.length);
              for (let i = 0; i < len; i += 1) {
                  merged[i] = $$scope.dirty[i] | lets[i];
              }
              return merged;
          }
          return $$scope.dirty | lets;
      }
      return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
      if (slot_definition) {
          const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
          slot.p(slot_context, dirty);
      }
  }
  function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
      update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_changes_fn, get_slot_context_fn);
  }
  function get_all_dirty_from_scope($$scope) {
      if ($$scope.ctx.length > 32) {
          const dirty = [];
          const length = $$scope.ctx.length / 32;
          for (let i = 0; i < length; i++) {
              dirty[i] = -1;
          }
          return dirty;
      }
      return -1;
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client
      ? () => window.performance.now()
      : () => Date.now();
  let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  function run_tasks(now) {
      tasks.forEach((task) => {
          if (!task.c(now)) {
              tasks.delete(task);
              task.f();
          }
      });
      if (tasks.size !== 0)
          raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each frame.
   */
  function loop(callback) {
      let task;
      if (tasks.size === 0)
          raf(run_tasks);
      return {
          promise: new Promise((fulfill) => {
              tasks.add((task = { c: callback, f: fulfill }));
          }),
          abort() {
              tasks.delete(task);
          },
      };
  }

  // Track which nodes are claimed during hydration. Unclaimed nodes can be removed from the DOM later
  // provided they meet the criteria.
  let is_hydrating = false;
  function start_hydrating() {
      is_hydrating = true;
  }
  function end_hydrating() {
      is_hydrating = false;
  }
  function upper_bound(low, high, key, value) {
      // Return first index of value larger than input value in the range [low, high)
      while (low < high) {
          const mid = low + ((high - low) >> 1);
          if (key(mid) <= value) {
              low = mid + 1;
          }
          else {
              high = mid;
          }
      }
      return low;
  }
  function init_hydrate(target) {
      if (target.hydrate_init)
          return;
      target.hydrate_init = true;
      // We know that all children have claim_order values DOM order indicating how the nodes should be hydrating.
      // Use the claim_order values to sort the children nodes in the DOM order strictly.
      // A hydration slot node may contain random nodes from server rendered DOM.
      // We need to catch these nodes after hydration and remove it for better performance.
      let children = target.childNodes;
      // Child nodes the hydrate may interfere with
      const unwanted = [];
      const claimed = [];
      for (const node of children) {
          if (node.nodeType === 8) {
              // TODO: replace with string literal
              const comment = node.textContent;
              if (comment.startsWith('HTML_TAG_START') || comment.startsWith('HTML_TAG_END')) {
                  unwanted.push(node);
              }
          }
          else if (node.nodeType === 1) {
              // @ts-ignore
              if (node.hasAttribute('data-svelte- सीईओ')) {
                  // @ts-ignore
                  const order = +node.getAttribute('data-svelte- सीईओ');
                  // @ts-ignore
                  claimed[order] = node;
              }
          }
      }
      // @ts-ignore
      const claimed_nodes = claimed.filter(Boolean);
      // We have to detach and re-attach the claimed nodes in the correct order, otherwise the hydration will fail
      if (claimed_nodes.length !== children.length - unwanted.length) {
          // Sort claimed nodes according to its claim_order value.
          // This will fix rendering errors caused by inconsistent server and client DOM structure.
          let j = 0;
          for (let i = 0; i < children.length; i++) {
              const node = children[i];
              // @ts-ignore
              if (claimed_nodes.includes(node)) {
                  if (node !== claimed_nodes[j])
                      node.parentNode.insertBefore(claimed_nodes[j], node);
                  j++;
              }
              else if (!unwanted.includes(node)) {
                  unwanted.push(node);
              }
          }
      }
      for (const node of unwanted) {
          node.remove();
      }
  }
  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      if (node.parentNode) {
          node.parentNode.removeChild(node);
      }
  }
  function destroy_each(iterations, detaching) {
      for (let i = 0; i < iterations.length; i += 1) {
          if (iterations[i])
              iterations[i].d(detaching);
      }
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function empty() {
      return text('');
  }
  function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function get_binding_group_value(group, current, value) {
      const initial = current.slice();
      for (const node of group) {
          // @ts-ignore
          if (node.checked) {
              initial.push(node.__value);
          }
      }
      return initial;
  }
  function to_number(value) {
      return value === '' ? null : +value;
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function set_input_value(input, value) {
      input.value = value == null ? '' : value;
  }
  function set_style(node, key, value, important) {
      if (value == null) {
          node.style.removeProperty(key);
      }
      else {
          node.style.setProperty(key, value, important ? 'important' : '');
      }
  }
  function select_option(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
          const option = select.options[i];
          if (option.__value === value) {
              option.selected = true;
              return;
          }
      }
      select.selectedIndex = -1; // no option should be selected
  }
  function select_options(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
          const option = select.options[i];
          option.selected = ~value.indexOf(option.__value);
      }
  }
  function select_value(select) {
      const selected_option = select.querySelector(':checked') || select.options[0];
      return selected_option && selected_option.__value;
  }
  function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, bubbles, cancelable, detail);
      return e;
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }
  function get_current_component() {
      if (!current_component)
          throw new Error('Function called outside component initialization');
      return current_component;
  }
  /**
   * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
   * It must be called during the component's initialisation (but doesn't need to be at the top level).
   *
   * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
   *
   * https://svelte.dev/docs#run-time-svelte-onmount
   */
  function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
  }
  /**
   * Associates an arbitrary `context` object with the current component and the specified `key`
   * and returns that object. The context is then available to children of the component
   * (including slotted content) with `getContext`.
   *
   * Like lifecycle functions, this must be called during component initialisation.
   *
   * https://svelte.dev/docs#run-time-svelte-setcontext
   */
  function setContext(key, context) {
      get_current_component().$$.context.set(key, context);
      return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component with the specified `key`.
   * Must be called during component initialisation.
   *
   * https://svelte.dev/docs#run-time-svelte-getcontext
   */
  function getContext(key) {
      return get_current_component().$$.context.get(key);
  }

  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  // We can force an update into a synchronous one by calling flush manually.
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          set_current_component(null);
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }
  /**
   * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
   */
  function flush_render_callbacks(fns) {
      const filtered = [];
      const targets = [];
      render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
      targets.forEach((c) => c());
      render_callbacks = filtered;
  }

  let promise;
  function wait() {
      if (!promise) {
          promise = Promise.resolve();
          promise.then(() => {
              promise = null;
          });
      }
      return promise;
  }
  function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros, // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
      else if (callback) {
          callback();
      }
  }

  const globals = (typeof window !== 'undefined'
      ? window
      : typeof globalThis !== 'undefined'
          ? globalThis
          : global);

  function create_component(block) {
      block && block.c();
  }
  function mount_component(component, target, anchor) {
      const { fragment, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
          // if the component was destroyed immediately
          // it will update the `$$.on_destroy` reference to `null`.
          // the destructured on_destroy may still reference to the old array
          if (component.$$.on_destroy) {
              component.$$.on_destroy.push(...new_on_destroy);
          }
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          flush_render_callbacks($$.after_update);
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[i / 31 | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const $$ = component.$$ = {
          fragment: null,
          ctx: [],
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          on_disconnect: [],
          before_update: [],
          after_update: [],
          context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
          // everything else
          callbacks: blank_object(),
          dirty,
          skip_bound: false,
          root: options.target || parent_component.$$.root,
      };
      append_styles && append_styles($$.root);
      let ready = false;
      $$.ctx = instance
          ? instance(component, options.props || {}, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if (!$$.skip_bound && $$.bound[i])
                      $$.bound[i](value);
                  if (ready) {
                      make_dirty(component, i);
                  }
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              start_hydrating();
              // @ts-ignore
              init_hydrate(options.target);
              // @ts-ignore
              $$.fragment && $$.fragment.l(children(options.target));
              end_hydrating();
          }
          else {
              // @ts-ignore
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  let SvelteElement;
  if (typeof HTMLElement === 'function') {
      SvelteElement = class extends HTMLElement {
          constructor() {
              super();
              this.attachShadow({ mode: 'open' });
          }
          connectedCallback() {
              const { on_mount } = this.$$;
              this.$$.on_disconnect = on_mount.map(run).filter(is_function);
              // @ts-ignore todo: improve typings
              for (const key in this.$$.slotted) {
                  // @ts-ignore todo: improve typings
                  this.appendChild(this.$$.slotted[key]);
              }
          }
          attributeChangedCallback(attr, _oldValue, newValue) {
              this[attr] = newValue;
          }
          disconnectedCallback() {
              run_all(this.$$.on_disconnect);
          }
          $destroy() {
              destroy_component(this, 1);
              this.$destroy = noop;
          }
          $on(type, callback) {
              // TODO should this only work for dispatchable events?
              if (!is_function(callback)) {
                  return noop;
              }
              const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
              callbacks.push(callback);
              return () => {
                  const index = callbacks.indexOf(callback);
                  if (index !== -1)
                      callbacks.splice(index, 1);
              };
          }
          $set($$props) {
              if (this.$$set && !is_empty($$props)) {
                  this.$$.skip_bound = true;
                  this.$$set($$props);
                  this.$$.skip_bound = false;
              }
          }
      };
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          if (!is_function(callback)) {
              return noop;
          }
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set($$props) {
          if (this.$$set && !is_empty($$props)) {
              this.$$.skip_bound = true;
              this.$$set($$props);
              this.$$.skip_bound = false;
          }
      }
  }

  /* src/App.svelte generated by Svelte v3.59.1 */

  const { window: window_1 } = globals;

  function create_fragment(ctx) {
  	let switch_instance;
  	let switch_instance_anchor;
  	let current;
  	var switch_value = /*$component*/ ctx[0];

  	function switch_props(ctx) {
  		return {
  			props: { config: /*config*/ ctx[1] },
  			$$inline: true
  		};
  	}

  	if (switch_value) {
  		switch_instance = new switch_value(switch_props(ctx));
  	}

  	return {
  		c() {
  			if (switch_instance) create_component(switch_instance);
  			switch_instance_anchor = empty();
  		},
  		m(target, anchor) {
  			if (switch_instance) {
  				mount_component(switch_instance, target, anchor);
  			}

  			insert(target, switch_instance_anchor, anchor);
  			current = true;
  		},
  		p(ctx, [dirty]) {
  			if (switch_value !== (switch_value = /*$component*/ ctx[0])) {
  				if (switch_instance) {
  					group_outros();
  					const old_component = switch_instance;

  					transition_out(old_component, 1, 1, () => {
  						old_component.$destroy();
  					});

  					check_outros();
  				}

  				if (switch_value) {
  					switch_instance = new switch_value(switch_props(ctx));
  					create_component(switch_instance);
  					transition_in(switch_instance, 1);
  					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
  				} else {
  					switch_instance = null;
  				}
  			} else if (switch_value) {
  				const switch_instance_changes = {};
  				if (dirty & /*config*/ 2) switch_instance_changes.config = /*config*/ ctx[1];
  				switch_instance.$set(switch_instance_changes);
  			}
  		},
  		i(local) {
  			if (current) return;
  			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
  			current = true;
  		},
  		o(local) {
  			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(switch_instance_anchor);
  			if (switch_instance) destroy_component(switch_instance, detaching);
  		}
  	};
  }

  function instance($$self, $$props, $$invalidate) {
  	let $component;
  	let { config } = $$props;
  	const component = writable(undefined);
  	component_subscribe($$self, component, value => $$invalidate(0, $component = value));

  	onMount(async () => {
  		const { pathname } = window.location;
  		const cms = createCMS({ config });
  		setContext('cms', cms);

  		if (pathname.includes('/auth-callback')) {
  			await cms.handleAuth();
  			return;
  		}

  		try {
  			await cms.restore();
  			const { default: Authenticated } = await import('./Authenticated-31c27c6e.js');
  			component.set(Authenticated);
  		} catch(e) {
  			const { default: Login } = await import('./Login-47a82c42.js');
  			component.set(Login);
  		}
  	});

  	$$self.$$set = $$props => {
  		if ('config' in $$props) $$invalidate(1, config = $$props.config);
  	};

  	return [$component, config];
  }

  class App_1 extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance, create_fragment, safe_not_equal, { config: 1 });
  	}
  }

  exports.SveltiaCMS = App_1;
  exports.default = App_1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=sveltia-cms.js.map
