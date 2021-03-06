import {
  get,
  action,
} from '@ember/object';

import {
  debug,
} from '@ember/debug';

import {
  validateNumber,
} from 'ember-changeset-validations/validators';

import Controller from '@ember/controller';

export default class CompetitionAdminController extends Controller {

  @action setMeasurementTime() {
    let model = this.model;
    let robots = get(model, 'robots');
    robots.forEach(function(item) {
      debug("setting meausured of " + get(item, 'robot') + " to false");
      item.set('measured', false);
      item.save();
    });
    let date = new Date('1970-01-01T00:00:00Z');
    model.set('registrationTime', date);
    model.save().then(() => {
      model.reload();
    });
  }

  @action toggleProperty(property) {
    debug('Entering toggleProperty!');
    let competition = this.model;
    let b = competition.get(property, this.model);
    debug('Setting ' + property + ' to ' + !b)
    competition.set(property, !b);
    this.model.save();
  }

  @action
  save(changeset) {
    changeset.save();
  }
  @action
  rollback(changeset) {
    changeset.rollback();
  }
}
