function change_language(lan) {
    // var language1 = 'en';
    // var language2 = 'ja';
    // var language3 = 'zh-Hans';
    var language = lan
    map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('port-cities-west-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('port-cities-east-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('port-cities-west-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('port-cities-east-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('country-label-md', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('country-label-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('state-label-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('state-label-md', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('state-label-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-lg-pt', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-lg-ln', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-md-pt', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-md-ln', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-labels-ridges', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-sm-pt', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('marine-label-sm-ln', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-city-lg-n', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-city-lg-s', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-city-md-n', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-city-md-s', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-city-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-town', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('place-island', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('water-label', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('water-label-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('road-label-lg', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('road-label-sm', 'text-field', '{name_' + language + '}');
    map.setLayoutProperty('waterway-label', 'text-field', '{name_' + language + '}');
}

function change_style(lan) {
    
}