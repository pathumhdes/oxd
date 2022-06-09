import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import {required} from '../../../../../components/src/validation/rules.ts';
import {h} from 'vue';

export default {
  title: 'Form/SchemaForm',
  component: SchemaForm,
};

const Template = (args) => ({
  components: {'oxd-schema-form': SchemaForm},
  setup() {
    const {schema, model} = useSchemaForm(args.schema);
    const onSubmit = (...args) => {
      console.log(args);
    };
    return {
      model,
      schema,
      onSubmit,
    };
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

const sample = {
  name: 'sampleForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'input',
            validators: new Map([['required', required]]),
          },
        ],
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  schema: {...sample},
};

const CrossValidationTemplate = (args) => ({
  components: {'oxd-schema-form': SchemaForm},
  setup() {
    const {schema, model} = useSchemaForm(args.schema);
    const onSubmit = (...args) => {
      console.log(args);
    };
    return {
      model,
      schema,
      onSubmit,
    };
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

const crossValidationSample = {
  name: 'crossValidationForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'vacancy',
            label: 'Vacancy',
            type: 'select',
            props: {
              options: [
                {id: 1, label: 'Vaccancy One'},
                {id: 2, label: 'Vaccancy Two'},
              ],
            },
            validators: new Map([['required', required]]),
          },
          {
            name: 'firstName',
            label: 'First Name',
            type: 'input',
            // eslint-disable-next-line @typescript-eslint/ban-types
            hook: (field, modelvalue) => {
              const model = modelvalue;
              const defaultValidtors = new Map();
              if (model.vacancy?.id === 1) {
                defaultValidtors.set('required', required);
              }
              field.validators = defaultValidtors;
              return {
                ...field,
              };
            },
          },
        ],
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};

export const CrossValidation = CrossValidationTemplate.bind({});
CrossValidation.args = {
  schema: {...crossValidationSample},
};

export const PromiseBased = Template.bind({});
PromiseBased.args = {
  schema: new Promise((resolve) => {
    setTimeout(() => {
      resolve({...sample});
    }, 5000);
  }),
};

export const FunctionBased = Template.bind({});
const getSchemaWithUser = async function (username) {
  // fake throttle request
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Promise((resolve) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((user) => {
        const _schema = {
          name: 'functionBasedForm',
          layout: [
            {
              type: 'custom',
              component: h('div', [
                h('img', {
                  src: `https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=radical`,
                  style: {
                    width: '100%',
                    padding: '0 0.25rem',
                    'box-sizing': 'border-box',
                  },
                }),
              ]),
            },
            {
              type: 'grid',
              props: {
                cols: 2,
              },
              children: {
                default: [
                  {
                    name: 'name',
                    label: 'Name',
                    type: 'input',
                    value: user.name,
                  },
                  {
                    name: 'url',
                    label: 'Website',
                    type: 'input',
                    value: user.blog,
                  },
                ],
              },
            },
          ],
        };
        resolve(_schema);
      });
  });
};
FunctionBased.args = {
  schema: getSchemaWithUser('yyx990803'),
};

export const Advance = Template.bind({});
Advance.args = {
  schema: {
    name: 'AdvanceForm',
    layout: [
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'resume',
              label: 'Select resume',
              type: 'file',
              class: ['--span-column-2'],
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 2,
        },
        children: {
          default: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'input',
              validators: new Map([['required', required]]),
              value: 'test',
            },
            {
              name: 'middleName',
              label: 'Middle Name',
              type: 'input',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'input',
              validators: new Map([['required', required]]),
            },
            {
              name: 'email',
              label: 'Email',
              type: 'input',
              visible: true,
              style: {
                color: 'red',
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'contactNumber',
              label: 'Contact Number',
              type: 'input',
              listners: {
                onChange: ($event) => console.log($event),
              },
            },
            {
              name: 'vacancy',
              label: 'Vacancy',
              type: 'select',
              props: {
                options: [
                  {id: 1, label: 'Vaccancy One'},
                  {id: 2, label: 'Vaccancy Two'},
                ],
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'user',
              label: 'Users',
              type: 'multiselect',
              value: [],
              props: {
                autofocus: true,
                options: [
                  {id: 1, label: 'HR'},
                  {id: 2, label: 'Admin'},
                ],
              },
            },
            {
              name: 'date',
              label: 'Date of Application',
              type: 'date',
            },
          ],
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'action',
        style: {
          'margin-top': '0.5rem',
        },
        children: {
          default: [
            {
              name: 'reset',
              label: 'Reset',
              type: 'button',
              props: {
                type: 'reset',
                displayType: 'ghost',
              },
            },
            {
              name: 'submit',
              label: 'Submit',
              type: 'button',
              style: {
                'margin-left': '0.5rem',
              },
              props: {
                type: 'submit',
                displayType: 'secondary',
              },
            },
          ],
        },
      },
    ],
  },
};



export const HelpTextSupportLabels = Template.bind({});
HelpTextSupportLabels.args = {
  schema: {
    name: 'HelpTextSupportLabels',
    layout: [
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'resume',
              label: 'Select resume',
              labelHelpText : "slect your resume",
              type: 'file',
              class: ['--span-column-2'],
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 2,
        },
        children: {
          default: [
            {
              name: 'firstName',
              label: 'First Name',
              labelHelpText : "your first name should comes here",
              type: 'input',
              validators: new Map([['required', required]]),
              value: 'test',
            },
            {
              name: 'middleName',
              label: 'Middle Name',
              labelHelpText : "your middle name should comes here",
              type: 'input',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              labelHelpText : "your last name should comes here",
              type: 'input',
              validators: new Map([['required', required]]),
            },
            {
              name: 'email',
              label: 'Email',
              labelHelpText : "your email should comes here",
              type: 'input',
              visible: true,
              style: {
                color: 'red',
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'contactNumber',
              label: 'Contact Number',
              labelHelpText : "your contact number should comes here",
              type: 'input',
              listners: {
                onChange: ($event) => console.log($event),
              },
            },
            {
              name: 'vacancy',
              label: 'Vacancy',
              labelHelpText : "select a vacancy",
              type: 'select',
              props: {
                options: [
                  {id: 1, label: 'Vaccancy One'},
                  {id: 2, label: 'Vaccancy Two'},
                ],
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'user',
              label: 'Users',
              labelHelpText : "select a user",
              type: 'multiselect',
              value: [],
              props: {
                autofocus: true,
                options: [
                  {id: 1, label: 'HR'},
                  {id: 2, label: 'Admin'},
                ],
              },
            },
            {
              name: 'date',
              label: 'Date of Application',
              labelHelpText : "select a date",
              type: 'date',
            },
            {
              name: 'check',
              label: 'Checkbox input',
              labelHelpText : "tick on me",
              type : 'checkbox',
              props : {optionLabel : 'check this!'}
            },
            {
              name: 'check',
              label: 'Switch input ',
              labelHelpText : "switch me",
              type : 'switch',
              props : {optionLabel : 'switch me!'}
            },
            {
              name: 'time',
              label: 'Time',
              labelHelpText : "Select the time",
              type : 'time'
        
            }
          ],
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'action',
        style: {
          'margin-top': '0.5rem',
        },
        children: {
          default: [
            {
              name: 'reset',
              label: 'Reset',
              type: 'button',
              props: {
                type: 'reset',
                displayType: 'ghost',
              },
            },
            {
              name: 'submit',
              label: 'Submit',
              type: 'button',
              style: {
                'margin-left': '0.5rem',
              },
              props: {
                type: 'submit',
                displayType: 'secondary',
              },
            },
          ],
        },
      },
    ],
  },
};

