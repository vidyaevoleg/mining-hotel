window.objectToFormData = function (object, form, namespace) {
  var
    formData = form || new FormData(),
    formKey;

  if (typeof object !== 'object') {
    formData.append(namespace, object)
  } else {
    for ( var property in object ) {

      if ( object.hasOwnProperty(property)) {

        if ( namespace ) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }

        if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
          if ( Array.isArray(object[property]) ) {
            var array = object[property];
            for (var i = 0 ; i < array.length; i++) {
              var arrayItem = array[i];
              objectToFormData(arrayItem, formData, formKey + '[]');
            }
          } else {
            objectToFormData(object[property], formData, formKey);
          }
        } else {
          formData.append(formKey, object[property]);
        }
      }
    }
  }

  return formData;
}

const API = {
  machines: {
    update (params, success, error) {
      return Rails.ajax({
        type: 'PUT',
        url: '/api/machines/' + params.id,
        data: objectToFormData({machine: params}),
        success: success,
        error: error
      })
    },
    create (params, success, error) {
      return Rails.ajax({
        type: 'POST',
        url: '/api/machines',
        data: objectToFormData({ machine: params }),
        success: success,
        error: error
      })
    },
    updateTemplate (params, success, error) {
      return Rails.ajax({
        type: 'PUT',
        url: '/api/machines/' + params.id + '/update_template',
        data: objectToFormData({template: params}),
        success: success,
        error: error
      })
    },
    delete (id, success) {
      return Rails.ajax({
        type: 'DELETE',
        url: '/api/machines/' + id,
        success: success
      })
    },
    reboot (id, success, error) {
      return Rails.ajax({
        type: 'PUT',
        url: '/api/machines/' + id + '/reboot',
        success: success,
        error: error
      })
    },
    uploadConfig (params, success, error) {
      return Rails.ajax({
        type: 'POST',
        url: '/api/machines/upload_config',
        errrep: true,
        data: objectToFormData(params),
        cache: false,
        contentType: false,
        processData: false,
        success: success,
        error: error
      })
    }
  }
}

export default API;
