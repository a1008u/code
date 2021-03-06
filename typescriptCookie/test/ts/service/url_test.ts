import { url } from '../../../src/ts/service/url';
import { paramjson } from '../../../src/ts/model/paramjson';

describe('【url】getParamのテスト', () => {
  it('?を除くクエリパラメータを取得した場合、&と=でパラメタを連想配列にする(keyが同じ場合上書きされない)', () => {
    let paramJson: paramjson = url.getParam('key=test&key=tom&iam3=sam');
    Object.keys(paramJson).forEach(key => {
      if (key === 'key') {
        expect(paramJson[key][0]).toBe('test');
        expect(paramJson[key][1]).toBe('tom');
      }
      if (key === 'iam3') expect(paramJson[key][0]).toBe('sam');
    });
  });

  it('?を除くクエリパラメータを取得した場合、&と=でパラメタを連想配列にできている', () => {
    let paramJson: paramjson = url.getParam('key=test&key2=tom&iam3=sam');
    for (let key in paramJson) {
      if (key === 'key') expect(paramJson[key][0]).toBe('test');
      if (key === 'key2') expect(paramJson[key][0]).toBe('tom');
      if (key === 'iam3') expect(paramJson[key][0]).toBe('sam');
    }
  });
});

describe('【url】checkParamのテスト', () => {
  it('checkParamの引数設定場合trueを返す', () => {
    expect(url.checkParam('test')).toBe(true);
  });

  it('checkParamの引数設定しない場合falseを返す', () => {
    expect(url.checkParam('')).toBe(false);
  });
});

describe('【url】containKeyのテスト', () => {
  it('【keysとprepareParamJsonのkeyに不一致の値を含む】keysに任意の値を入れて、パラメタのkeyに一致するkey=valueだけを設定したjsonが取得できているか確認', () => {
    let keys = ['key', 'key2', 'tom'];
    let prepareParamJson: paramjson = url.getParam(
      'key=test&key2=tom&iam3=sam'
    );
    let paramJson: paramjson = url.containKey(keys, prepareParamJson);

    // 取得元と取得先のjsonが同じでないことを確認
    expect(paramJson).not.toEqual(prepareParamJson);

    // keysで取得したくない値が設定していないことを確認
    expect(paramJson).not.toContain('tom');

    // paramJsonの方でも要求されていないkeyを含んでいないか確認
    expect(paramJson).not.toContain('iam3');

    // paramJsonには要求された　keyが取得されていること
    for (let key in paramJson) {
      if (key === 'key') expect(paramJson[key][0]).toBe('test');
      if (key === 'key2') expect(paramJson[key][0]).toBe('tom');
    }
  });

  it('【keysよりprepareParamJsonのkeyが多い一致】keysに任意の値を入れて、パラメタのkeyに一致するkey=valueだけを設定したjsonが取得できているか確認', () => {
    let keys = ['key', 'key2'];
    let prepareParamJson: paramjson = url.getParam(
      'key=test&key2=tom&iam3=sam'
    );
    let paramJson: paramjson = url.containKey(keys, prepareParamJson);

    // 取得元と取得先のjsonが同じでないことを確認
    expect(paramJson).not.toEqual(prepareParamJson);

    // keysで取得したくない値が設定していないことを確認
    expect(paramJson).not.toContain('tom');

    // paramJsonの方でも要求されていないkeyを含んでいないか確認
    expect(paramJson).not.toContain('iam3');

    // paramJsonには要求された　keyが取得されていること
    Object.keys(paramJson).forEach(key => {
      if (key === 'key') expect(paramJson[key][0]).toBe('test');
      if (key === 'key2') expect(paramJson[key][0]).toBe('tom');
    });
  });

  it('【keysとprepareParamJsonのkeyが一致】keysに任意の値を入れて、パラメタのkeyに一致するkey=valueだけを設定したjsonが取得できているか確認', () => {
    let keys = ['key', 'key2', 'iam3'];
    let prepareParamJson: paramjson = url.getParam(
      'key=teeee&key=test&key2=tom&iam3=sam'
    );
    let paramJson: paramjson = url.containKey(keys, prepareParamJson);

    // 取得元と取得先のjsonが同じでないことを確認
    expect(paramJson).toEqual(prepareParamJson);

    // paramJsonには要求された　keyが取得されていること
    Object.keys(paramJson).forEach(key => {
      if (key === 'key') {
        expect(paramJson[key][0]).toBe('teeee');
        expect(paramJson[key][1]).toBe('test');
      }
      if (key === 'key2') {
        expect(paramJson[key][0]).toBe('tom');
      }
      if (key === 'iam3') {
        expect(paramJson[key][0]).toBe('sam');
      }
    });
  });

  it('【keysnの方がprepareParamJsonよりkeyが多い】keysに任意の値を入れて、パラメタのkeyに一致するkey=valueだけを設定したjsonが取得できているか確認', () => {
    let keys = ['key', 'key2', 'key3', 'key4', 'key5', 'iam3'];
    let prepareParamJson: paramjson = url.getParam(
      'key=test&key2=tom&iam3=sam'
    );
    let paramJson: paramjson = url.containKey(keys, prepareParamJson);

    // 取得元と取得先のjsonが同じでないことを確認
    expect(paramJson).toEqual(prepareParamJson);

    // paramJsonには要求された　keyが取得されていること

    Object.keys(paramJson).forEach(key => {
      if (key === 'key') {
        expect(paramJson[key][0]).toBe('test');
      }
      if (key === 'key2') {
        expect(paramJson[key][0]).toBe('tom');
      }
      if (key === 'iam3') {
        expect(paramJson[key][0]).toBe('sam');
      }
    });
  });
});
