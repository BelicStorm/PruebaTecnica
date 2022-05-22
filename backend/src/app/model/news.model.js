module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        date: Date,
        content:String,
        author:String,
        status:["New", "Archived", "Deleted"],
        archiveDate:Date,
      },
      { timestamps: true } 
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const News = mongoose.model("news", schema);
    return News;
};

