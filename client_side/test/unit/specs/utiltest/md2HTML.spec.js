import md2HTML from '../../../../src/util/md2HTML.js'



describe('md2HTML.js', () => {
    it('convert text correct', () => {
        const  text = `
        # h1
        ## h2
        ### h3
        #### h4
        `
        console.log(md2HTML(text))
        expect(md2HTML(text)).to.equal('wtf');
     
    });
});


