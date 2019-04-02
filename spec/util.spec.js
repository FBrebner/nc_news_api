const { expect } = require('chai');
const { timestampToDate, nameAndIDs, replaceCategoryWithID } = require('../utils/data_normalisation')

describe('convertTimestampToDate', () => {
    it('converts the created_at column of a single article object to a date from timestamp', () => {
        let input = [{
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
          }]
        let output = [{
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: '2014-11-16',
          }]
        expect(timestampToDate(input)).to.eql(output);
    });
    it('converts the created_at column of multiple objects in an array', () => {
        let input = [{
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
          },
          {
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: 1289996514171,
          },
          {
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body:
              'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171,
          }]
        let output = [{
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: '2014-11-16',
          },
          {
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: '2010-11-17',
          },
          {
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body:
              'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: '2006-11-18',
          }]
        expect(timestampToDate(input)).to.eql(output);
    });
});

describe('nameAndIDs', () => {
    it('creates a name and ID pair for a single article', () => {
        input = [{
            article_id: 1,
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
          },]
        output = {'Sony Vaio; or, The Laptop': 1}
        console.log(nameAndIDs(input, 'title', 'article_id'));
        expect(nameAndIDs(input, 'title', 'article_id')).to.eql(output)
    });
    it('creates a name and ID pair for multiple articles', () => {
        input = [{
            article_id: 1,
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            created_at: 1416140514171,
          },
          {
            article_id: 5,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: 1289996514171,
          },
          {
            article_id: 9,
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body:
              'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171,
          }]
        output = {'Sony Vaio; or, The Laptop': 1, 'Eight pug gifs that remind me of mitch': 5, 'Student SUES Mitch!': 9}
        expect(nameAndIDs(input, 'title', 'article_id')).to.eql(output)
    });
});

describe('replaceCategoryWithID', () => {
    it('replaces a single comment objects belong_to category with article ID', () => {
        input = [{
            comment_id : 1,
            author : 'Fraser',
            topic : 'Fire',
            body: ' I carry a log — yes. Is it funny to you? It is not to me.',
            belongs_to: 'Living in the shadow of a great man',
            votes: -100,
            created_at: 1416746163389,
          }]
          let nameIdPairs = {'Living in the shadow of a great man': 1}
          output = [{
            comment_id : 1,
            author : 'Fraser',
            topic : 'Fire',
            body: ' I carry a log — yes. Is it funny to you? It is not to me.',
            article_id : 1,
            votes: -100,
            created_at: 1416746163389,
          }]
        expect(replaceCategoryWithID(input, 'belongs_to', 'article_id', nameIdPairs)).to.eql(output)
    });
    it('replaces the belongs_to category within multiple comment objects with articleID', () => {
        input = [{
            comment_id : 1,
            author : 'Fraser',
            topic : 'Fire',
            body: ' I carry a log — yes. Is it funny to you? It is not to me.',
            belongs_to: 'Living in the shadow of a great man',
            votes: -100,
            created_at: 1416746163389,
          },
          {
              comment_id : 3,
            body: 'The owls are not what they seem.',
            topic: 'crime',
            belongs_to: "They're not exactly dogs, are they?",
            author: 'icellusedkars',
            votes: 20,
            created_at: 1006778163389,
          },
          {
              comment_id : 20,
            body: 'This morning, I showered for nine minutes.',
            topic: 'fantasy',
            belongs_to: 'Living in the shadow of a great man',
            author: 'butter_bridge',
            votes: 16,
            created_at: 975242163389,
          }]
        let nameIdPairs = {'Living in the shadow of a great man': 1, "They're not exactly dogs, are they?": 7, }
        output = [{
            comment_id : 1,
            author : 'Fraser',
            topic : 'Fire',
            body: ' I carry a log — yes. Is it funny to you? It is not to me.',
            article_id : 1,
            votes: -100,
            created_at: 1416746163389,
          },
          {
              comment_id : 3,
            body: 'The owls are not what they seem.',
            topic: 'crime',
            article_id : 7,
            author: 'icellusedkars',
            votes: 20,
            created_at: 1006778163389,
          },
          {
              comment_id : 20,
            body: 'This morning, I showered for nine minutes.',
            topic: 'fantasy',
            article_id : 1,
            author: 'butter_bridge',
            votes: 16,
            created_at: 975242163389,
          }]
          expect(replaceCategoryWithID(input, 'belongs_to', 'article_id', nameIdPairs)).to.eql(output)
        });
});