//
// Copyright (c) 2017-present, by Evan Bacon. All Rights Reserved.
// @author Evan Bacon / https://github.com/EvanBacon
//

import { Image } from 'react-native';
import { Asset, Font } from 'expo';

export default function cacheAssetsAsync({ images = [], fonts = [], audio = [] }) {
  return Promise.all([...cacheImages(images), ...cacheFonts(fonts), ...cacheAudio(audio)]);
}


function cacheAudio(audio) {
  return audio.map(phile => Asset.fromModule(phile).downloadAsync() );
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
